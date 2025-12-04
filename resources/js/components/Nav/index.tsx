import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { LAPTOP_BREAKPOINT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { Image, ThemeIcon, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Search, SirenIcon } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlinePermPhoneMsg } from 'react-icons/md';

import LanguageSelector from './LanguageSelector';
import MobileNav from './Mobile';

export default function Nav() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSticky, setIsSticky] = React.useState(false);
  const theme = useMantineTheme();
  const currentPath = route().current();
  const t_opt = { ns: 'nav' };
  const canChangeLocale = false;
  const matchLaptop = useMediaQuery(LAPTOP_BREAKPOINT);

  const navItems = [
    {
      label: 'cari-dokter',
      href: route('patient.findDoctor.index'), // example route, replace with your own
    },
    {
      label: 'layanan-kesehatan',
      children: [
        { label: 'layanan-kesehatan.poliklinik', href: route('service.polyclinic.index') },
        { label: 'layanan-kesehatan.sunday-clinic', href: route('service.sundayClinic.index') },
        { label: 'layanan-kesehatan.medical-check-up', href: route('service.medicalCheckup.index') },
        { label: 'layanan-kesehatan.hemodialisis', href: route('service.hemodialysis.index') },
        { label: 'layanan-kesehatan.laboratorium', href: route('service.laboratorium.index') },
        { label: 'layanan-kesehatan.intensive-care', href: route('service.intensiveCare.index') },
        { label: 'layanan-kesehatan.instalasi-gawat-darurat', href: route('service.emergencyInstallation.index') },
        { label: 'layanan-kesehatan.radiologi', href: route('service.radiology.index') },
      ],
    },
    {
      label: 'diklitlat',
      children: [
        { label: 'diklitlat.pendidikan', href: route('diklat.education.index') },
        { label: 'diklitlat.pelatihan', href: route('diklat.training.index') },
        { label: 'diklitlat.penelitian', href: route('diklat.research.index') },
        { label: 'diklitlat.publikasi', href: route('diklat.publication.index') },
        { label: 'diklitlat.uji-validasi-alkes', href: route('diklat.medDevValidation.index') },
      ],
    },
    {
      label: 'info-media',
      children: [
        { label: 'info-media.promosi', href: route('info-media.promosi.index') },
        { label: 'info-media.kegiatan', href: route('info-media.kegiatan.index') },
        { label: 'info-media.buletin-bicara-sehat', href: route('info-media.buletin.index') },
        { label: 'info-media.info-kelainan-penyakit', href: route('info-media.disorderDisease.index') },
        { label: 'info-media.artikel-kesehatan', href: route('info-media.popularArticle.index') },
        { label: 'info-media.berita', href: route('info-media.berita.index') },
        { label: 'info-media.edukasi-visual', href: route('info-media.edukasiVisual.index') },
        { label: 'info-media.video-kesehatan', href: route('info-media.videoKesehatan.index') },
        { label: 'info-media.faq', href: route('info-media.faq.index') },
      ],
    },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.get(route('search.index'), { keyword: searchQuery.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleSearchIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
    handleSearch(e);
  };

  if (matchLaptop) {
    return (
      <div
        className={cn('w-full transition-all duration-300', isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative')}
      >
        <MobileNav
          theme={theme}
          currentPath={currentPath ?? ''}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleKeyPress={handleKeyPress}
          handleSearchIconClick={handleSearchIconClick}
          navItems={navItems}
        />
        {/* Placeholder div to prevent content jumping when navbar becomes fixed */}
        {isSticky && <div className="h-[6rem]" />}
      </div>
    );
  }

  return (
    <>
      <div
        className={cn('w-full transition-all duration-300', isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative')}
      >
        {/* Top Bar */}
        <div className="text-white px-4 py-2" style={{ backgroundColor: theme.colors.blue[8] }}>
          <div className="mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <Link href={route('home.index')}>
                <span className={cn('hover:text-blue-200 cursor-pointer', currentPath === 'home.index' && 'font-bold')}>
                  {t('pasien-pengunjung', t_opt)}
                </span>
              </Link>
              <Link href={route('about.index')}>
                <span
                  className={cn('hover:text-blue-200 cursor-pointer', currentPath === 'about.index' && 'font-bold')}
                >
                  {t('profil-rsui', t_opt)}
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <span className="font-medium">{t('hubungi-kami', t_opt)}:</span>
                <a href="tel:08119113913" className="flex items-center space-x-1 cursor-pointer">
                  <ThemeIcon variant="filled" color="green" radius={'xl'} size={'sm'}>
                    <IconBrandWhatsapp className="w-4 h-4" />
                  </ThemeIcon>
                  <span>0811 9113 913</span>
                </a>
                <a href="tel:02150829292" className="flex items-center space-x-1 cursor-pointer">
                  <ThemeIcon variant="filled" color="blue" radius={'xl'} size={'sm'}>
                    <MdOutlinePermPhoneMsg className="w-4 h-4" />
                  </ThemeIcon>
                  <span>021 508 292 92</span>
                </a>
              </div>

              <a href="tel:+622150829282">
                <Badge variant="destructive" className="bg-red-600 hover:bg-red-700 px-3 py-1 cursor-pointer">
                  <ThemeIcon variant="filled" color="red" radius={'xl'} size={'sm'} me={'xs'}>
                    <SirenIcon className="w-4 h-4" />
                  </ThemeIcon>
                  {t('emergency', t_opt)}
                </Badge>
              </a>

              {canChangeLocale && <LanguageSelector />}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white border-b shadow-sm px-4 py-2">
          <div className="mx-auto flex items-center justify-between">
            <Link href="/">
              <Image src={'/assets/media/logo-full.png'} alt="RSUI Logo" mah={65} w={110} className="cursor-pointer" />
            </Link>

            <NavigationMenu viewport={false} className="ml-auto mr-2">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger style={{ color: theme.colors.blue[8] }} className="nav-menu-title">
                          {t(item.label, t_opt)}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="z-10">
                          <ul className="grid w-[200px] gap-4">
                            <li>
                              {item.children.map((child) => (
                                <NavigationMenuLink asChild className="nav-menu-text" key={child.label}>
                                  <Link href={child.href}>{t(child.label, t_opt)}</Link>
                                </NavigationMenuLink>
                              ))}
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle() + ` nav-menu-title`}
                        style={{ color: theme.colors.blue[8], fontSize: '16px' }}
                      >
                        <Link href={item.href}>{t(item.label, t_opt)}</Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <a href="https://m.rs.ui.ac.id/" target="_blank">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">{t('buat-janji', t_opt)}</Button>
              </a>
              <div className="relative">
                <Input
                  placeholder={t('pencarian', t_opt)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-48 pr-10"
                />
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  onClick={handleSearchIconClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder div to prevent content jumping when navbar becomes fixed */}
      {isSticky && <div className="h-[8rem]" />}
    </>
  );
}
