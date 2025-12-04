import { ImageWithLoading } from '@/components/Image/ImageWithLoading';
import { NotifyError } from '@/components/Notifications/Notify';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LAPTOP_BREAKPOINT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Doctor, PolyClinic, Slider } from '@/types/models';
import { Link, router } from '@inertiajs/react';
import { Carousel } from '@mantine/carousel';
import { Combobox, Grid, Loader, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedCallback, useMediaQuery } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Autoplay from 'embla-carousel-autoplay';
import Fuse from 'fuse.js';
import { MoveRight, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import classes from './Hero.module.css';

const placeHolderImages = [
  '/assets/media/example/slider.png',
  '/assets/media/example/article.png',
  '/assets/media/example/poster.png',
  '/assets/media/example/poster2.jpeg',
];

export default function Hero(
  props: PageProps & { ns: string; sliders: Slider[]; doctors: Doctor[]; polyclinics: PolyClinic[] },
) {
  const { t } = useTranslation();
  const t_opt = { ns: props.ns };

  // breakpoint
  const matchLaptop = useMediaQuery(LAPTOP_BREAKPOINT);

  // slider
  const slider = props.sliders;
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  // Search
  const initialData = {
    doctor: props.doctors.map((d) => ({ value: `${d.id}`, label: d.nama_dokter })),
    clinic: props.polyclinics.map((c) => ({ value: `${c.id}`, label: c.judul })),
  };
  const [searchMode, setSearchMode] = useState<'doctor' | 'clinic'>('doctor');
  const [searchValue, setSearchValue] = useState('');
  const [cbData, setCbData] = useState(initialData[searchMode]);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const fuse = useMemo(() => {
    return new Fuse(cbData, {
      keys: ['label'],
      includeScore: true,
      threshold: 0.4,
      isCaseSensitive: false,
    });
  }, [cbData, searchValue]);

  const filteredOptions = useMemo(() => {
    // If the search value is empty, return all the data
    if (!searchValue) {
      return cbData;
    }
    // Perform the fuzzy search
    return fuse.search(searchValue).map((result) => result.item);
  }, [searchValue, fuse, cbData]);

  const options = filteredOptions.map((item, i) => (
    <Combobox.Option value={item.value} key={i}>
      {item.label}
    </Combobox.Option>
  ));
  // limit options to 4 items if not searching

  useEffect(() => {
    // we need to wait for options to render before we can select first one
    combobox.selectFirstOption();
    if (searchValue.trim().length > 0) {
      debouncedSearch({ keyword: searchValue, searchMode });
    } else {
      setCbData(initialData[searchMode]);
      combobox.resetSelectedOption();
    }
  }, [searchValue]);

  useEffect(() => {
    setSearchValue('');
    setCbData(initialData[searchMode]);
    combobox.resetSelectedOption();
  }, [searchMode]);

  // search
  const searchQueryURLMap = {
    doctor: route('home.findDoctor'),
    clinic: route('home.findClinic'),
  };
  const searchMutation = useMutation({
    gcTime: 900000, // 15 min cache on frontend
    mutationFn: ({ keyword, searchMode }: { keyword: string; searchMode: 'doctor' | 'clinic' }) => {
      const url = searchQueryURLMap[searchMode];
      const req = axios.post(url, { keyword });
      return req;
    },
    onSettled(data, error, variables, context) {
      if (data) {
        const { data: result } = data.data;
        if (variables.searchMode === 'doctor') {
          setCbData(
            result.map((item: { id: number; nama_dokter: string }) => ({
              value: `${item.id}`,
              label: item.nama_dokter,
            })),
          );
        } else {
          setCbData(result.map((item: { id: number; judul: string }) => ({ value: `${item.id}`, label: item.judul })));
        }

        combobox.resetSelectedOption();
      } else {
        console.error(error);
        NotifyError('Gagal!', 'Terjadi kesalahan saat mencari data');
      }
    },
  });
  const debouncedSearch = useDebouncedCallback(
    ({ keyword, searchMode }: { keyword: string; searchMode: 'doctor' | 'clinic' }) => {
      if (!keyword) return; // must have keyword
      searchMutation.mutate({ keyword, searchMode });
    },
    350,
  );

  // ------------------------
  // Hero components
  const HeroText = (
    <div className="text-white space-y-12 py-20 px-4">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ">
          {t('hero.title', t_opt)
            .split('\n')
            .map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
        </h1>
        <Button
          size="lg"
          className="mx-auto mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <a href="https://m.rs.ui.ac.id/" target="_blank">
            <span className="font-semibold text-lg">{t('hero.buat-janji', t_opt)}</span>
            <span className="ml-2">→</span>
          </a>
        </Button>
      </div>
      <div className="text-xl">
        <p className="whitespace-pre">{t('hero.subtitle', t_opt)}</p>
      </div>
    </div>
  );

  const HeroImage = (
    <>
      <Carousel
        withIndicators
        w={'100%'}
        h={'100%'}
        mah={550}
        classNames={{
          viewport: classes['image-viewport'],
          indicator: classes.indicator,
          root: classes.root,
          controls: classes.controls,
        }}
        emblaOptions={{ align: 'start', loop: true }}
        slideGap={0}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
      >
        {slider.map((image, index) => (
          <Carousel.Slide key={index}>
            <Link href={image.link ?? '#'}>
              <ImageWithLoading src={image.file_name!} alt={`slider-${image.judul}`} className="object-cover" />
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>

      <div className="absolute bottom-10 w-11/12 left-1/2 -translate-x-1/2">
        {/* Search Form */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-600 font-medium">{t('hero.search', t_opt)}:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    'cursor-pointer',
                    searchMode === 'doctor'
                      ? 'text-white  bg-orange-500 hover:bg-orange-600'
                      : 'hover:bg-gray-200 border-gray-300 text-gray-600',
                  )}
                  onClick={() => setSearchMode('doctor')}
                >
                  {t('hero.search.doctor', t_opt)}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    'cursor-pointer',
                    searchMode === 'clinic'
                      ? 'text-white  bg-orange-500 hover:bg-orange-600'
                      : 'hover:bg-gray-200 border-gray-300 text-gray-600',
                  )}
                  onClick={() => setSearchMode('clinic')}
                >
                  {t('hero.search.clinic', t_opt)}
                </Badge>
              </div>
            </div>

            <Combobox
              onOptionSubmit={(optionValue) => {
                combobox.closeDropdown();

                if (optionValue === 'all') {
                  if (searchMode === 'doctor') {
                    router.visit(route('patient.findDoctor.index'));
                  } else {
                    router.visit(route('service.polyclinic.index'));
                  }
                  return;
                }

                // single item selected → go to detail page
                if (searchMode === 'doctor') {
                  router.visit(route('patient.findDoctor.show', optionValue));
                } else {
                  router.visit(route('service.polyclinic.show', optionValue));
                }
              }}
              store={combobox}
            >
              <Combobox.Target>
                <TextInput
                  placeholder={t('hero.search.placeholder', t_opt)}
                  value={searchValue}
                  onChange={(event) => {
                    setSearchValue(event.currentTarget.value);
                    combobox.openDropdown();
                  }}
                  onClick={() => combobox.openDropdown()}
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => {
                    combobox.closeDropdown();
                    setSearchValue('');
                  }}
                  leftSection={searchMutation.isPending ? <Loader size={10} /> : <Search size={16} />}
                />
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>
                  {searchMutation.isPending ? (
                    <Combobox.Empty pos={'relative'}>
                      <Loader size={10} /> {t('hero.search.loading', t_opt)}
                    </Combobox.Empty>
                  ) : options.length === 0 ? (
                    <Combobox.Empty>{t('hero.search.empty', t_opt)}</Combobox.Empty>
                  ) : (
                    <>
                      <Combobox.Options mah={140} style={{ overflowY: 'auto' }}>
                        {options}
                      </Combobox.Options>
                      <Combobox.Option value="all" key="all" p={0}>
                        <span className="flex items-center border-t-2 border-black">
                          <span className="flex mx-auto mt-2 mb-2 text-blue-700">
                            {t(`hero.search.all.${searchMode}`, t_opt)} <MoveRight className="ms-2" />
                          </span>
                        </span>
                      </Combobox.Option>
                    </>
                  )}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="m-0 p-0 w-full overflow-hidden">
      {matchLaptop ? (
        <div className="relative">{HeroImage}</div>
      ) : (
        <Grid>
          {/* Left Side */}
          <Grid.Col span={4} p={'lg'} m={0} className="shadow-2xl hero-section">
            {HeroText}
          </Grid.Col>

          {/* Right Side */}
          <Grid.Col span={8} py={0} px={0} m={0} className="relative">
            {HeroImage}
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
}
