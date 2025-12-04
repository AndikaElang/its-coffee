'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { TW_LG, TW_MD, TW_XL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import homepageStyle from '~/css/Homepage.module.css';

interface LetterData {
  letter: string;
  title: string;
  description: string;
  color: 'blue' | 'orange';
  manualOffset?: number;
  className?: string;
}

export default function RSUICare(props: PageProps & { ns: string }) {
  const { t } = useTranslation();
  const t_opt = { ns: 'rsuiProfile' };
  const [activeIndex, setActiveIndex] = useState(0);

  const matchMD = useMediaQuery(`(min-width: ${TW_MD}px)`);
  const matchLG = useMediaQuery(`(min-width: ${TW_LG}px)`);
  const matchXL = useMediaQuery(`(min-width: ${TW_XL}px)`);
  const getValueBasedOnScreen = ({
    mdv,
    lgv,
    xlv,
    defaultValue,
  }: {
    mdv?: number;
    lgv?: number;
    xlv?: number;
    defaultValue: number;
  }) => {
    if (matchXL && xlv) return xlv;
    if (matchLG && lgv) return lgv;
    if (matchMD && mdv) return mdv;
    if (defaultValue) return defaultValue;
    return 0;
  };

  const letterData: LetterData[] = [
    {
      letter: 'R',
      title: t('ra', t_opt),
      description: t('ra.description', t_opt),
      color: 'blue',
      manualOffset: getValueBasedOnScreen({ defaultValue: -1, lgv: -2 }),
    },
    {
      letter: 'S',
      title: t('s', t_opt),
      description: t('s.description', t_opt),
      color: 'blue',
      manualOffset: getValueBasedOnScreen({ defaultValue: -0.5, xlv: 0.1, lgv: -1.5, mdv: 0.5 }),
    },
    {
      letter: 'U',
      title: t('u', t_opt),
      description: t('u.description', t_opt),
      color: 'blue',
      manualOffset: getValueBasedOnScreen({ defaultValue: 0.5, xlv: 0.1, lgv: -0.5 }),
    },
    {
      letter: 'I',
      title: t('i', t_opt),
      description: t('i.description', t_opt),
      color: 'blue',
      manualOffset: getValueBasedOnScreen({ defaultValue: -0.5 }),
    },
    {
      letter: 'C',
      title: t('c', t_opt),
      description: t('c.description', t_opt),
      color: 'orange',
      manualOffset: getValueBasedOnScreen({ defaultValue: -1, lgv: -0.5, mdv: -1.5 }),
      className: 'italic',
    },
    {
      letter: 'A',
      title: t('a', t_opt),
      description: t('a.description', t_opt),
      color: 'orange',
      manualOffset: getValueBasedOnScreen({ defaultValue: 0.5, xlv: 0.1, lgv: 0.5, mdv: -1 }),
      className: 'italic',
    },
    {
      letter: 'R',
      title: t('re', t_opt),
      description: t('re.description', t_opt),
      color: 'orange',
      manualOffset: getValueBasedOnScreen({ defaultValue: 1.5, xlv: 0.7, lgv: 1.5, mdv: -0.25 }),
      className: 'italic',
    },
    {
      letter: 'E',
      title: t('e', t_opt),
      description: t('e.description', t_opt),
      color: 'orange',
      manualOffset: getValueBasedOnScreen({ defaultValue: 1.5, xlv: 1, lgv: 2, mdv: -0.25 }),
      className: 'italic',
    },
  ];

  const activeData = letterData[activeIndex];

  const letterWidth = getValueBasedOnScreen({ mdv: 112, lgv: 96, xlv: 112, defaultValue: 60 });
  const minClamp = getValueBasedOnScreen({ mdv: 5.5, lgv: 2, xlv: 4, defaultValue: 8 });
  const maxClamp = getValueBasedOnScreen({ mdv: 95, lgv: 94, xlv: 96, defaultValue: 92 });

  console.log(letterWidth, minClamp, maxClamp);
  const calculateArrowPosition = () => {
    // Calculate position based on flex layout with gaps
    // Each letter is roughly 80-100px wide, with 16px gaps (gap-4)
    const totalLetters = letterData.length;
    // approximate letter width in pixels
    const gapWidth = 16; // gap-4 = 16px

    // Calculate total width of all letters and gaps
    const totalContentWidth = totalLetters * letterWidth + (totalLetters - 1) * gapWidth;

    // Calculate the starting position (left edge of first letter)
    const startOffset = (100 - totalContentWidth / 10) / 2; // rough percentage conversion

    // Calculate position of active letter center
    let letterPosition = startOffset + (activeIndex * (letterWidth + gapWidth)) / 10 + letterWidth / 20;

    // if active index is first. minus 2. if last index. plus 2.
    const manualOffset = letterData[activeIndex].manualOffset || 0;
    letterPosition += manualOffset;

    return `${Math.max(minClamp, Math.min(maxClamp, letterPosition))}%`; // Clamp between 8% and 92%
  };

  const subtitleText = (
    <>
      <span className="font-semibold text-blue-600">RSUI</span>
      <span> </span>
      <span className="font-semibold text-orange-500 italic">CARE</span>
    </>
  );

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto max-xs:px-4">
        <div className={cn(homepageStyle.header)}>
          <div>
            <h2 className="text-4xl font-bold text-left color-mantine-blue-8 mb-4">{t('nilai-budaya', t_opt)}</h2>
            <p className="text-left text-gray-600 text-xl mb-12">
              {subtitleText} {t('nilai-budaya.description', t_opt)}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-col">
          {/* Letter Navigation */}
          <div className="relative flex justify-center items-center mx-auto gap-4 mb-8">
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-300" />

            {letterData.map((item, index) => (
              <div key={index} className="relative">
                <p
                  onClick={() => setActiveIndex(index)}
                  className={`${item.className ?? ''} md:px-4 lg:px-8 xl:px-10 text-6xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 ${
                    item.color === 'blue'
                      ? 'text-blue-600 hover:text-blue-700'
                      : 'text-orange-500 hover:text-orange-600'
                  }`}
                >
                  {item.letter}
                </p>
                {activeIndex === index && (
                  <div
                    className={`absolute -bottom-2 left-0 right-0 h-1 rounded-full z-10 ${
                      item.color === 'blue' ? 'bg-blue-600' : 'bg-orange-500'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Content Card */}
          <div className="flex justify-center relative ">
            <Card className="w-full shadow-xl-all relative max-w-2xl lg:max-w-5xl">
              <div
                className={`absolute -top-5 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[20px] border-l-transparent border-r-transparent transition-all duration-500 ease-out ${
                  activeData.color === 'blue' ? 'border-b-blue-600' : 'border-b-orange-500'
                }`}
                style={{
                  left: calculateArrowPosition(),
                  transform: 'translateX(-50%)',
                }}
              />
              <div
                className={`absolute -top-3 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[18px] border-l-transparent border-r-transparent border-b-white z-10 transition-all duration-500 ease-out`}
                style={{
                  left: calculateArrowPosition(),
                  transform: 'translateX(-50%)',
                }}
              />

              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span
                    className={cn(
                      activeData.className,
                      activeData.color === 'blue' ? 'text-blue-600' : 'text-orange-500',
                    )}
                  >
                    {activeData.letter}
                  </span>
                  <span className="text-black ">{activeData.title.slice(1)}</span>
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">{activeData.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden px-4">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {letterData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="text-left px-6">
                  <div className="flex items-center gap-3">
                    <p>
                      <span
                        className={`${item.className} text-2xl font-bold ${item.color === 'blue' ? 'text-blue-600' : 'text-orange-500'}`}
                      >
                        {item.letter}
                      </span>
                      <span className="text-lg font-semibold text-black ml-0.5">{item.title.slice(1)}</span>
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
