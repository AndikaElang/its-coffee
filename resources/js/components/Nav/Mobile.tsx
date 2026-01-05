'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from '@inertiajs/react';
import { Image } from '@mantine/core';
import { BaggageClaim, FileChartColumn, Menu, X } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import LanguageSelector from './LanguageSelector';

interface MobileNavProps {
  theme: any;
  currentPath: string;
  navItems: Array<{
    label: string;
    href?: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

export default function MobileNav({ theme, currentPath, navItems }: MobileNavProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const t_opt = { ns: 'nav' };
  const canChangeLocale = false;

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    if (!isOpen) {
      setOpenSubmenu(null);
    }
  }, [isOpen]);

  return (
    <>
      {/* Top Bar - Always visible */}
      {/* <div className="text-white px-4 py-2 relative" style={{ backgroundColor: theme.colors.blue[8] }}>
        <div className="flex items-center justify-between text-sm">
          <a href="tel:02150829292" className="flex items-center space-x-1">
            <MdOutlinePermPhoneMsg className="w-4 h-4" />
            <span className="font-medium">{t('hubungi-kami', t_opt)} 1-500-911</span>
          </a>
          <a href="tel:08119113913" className="flex items-center space-x-1">
            <IconBrandWhatsapp className="w-4 h-4 text-green-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div> */}

      {/* Main Mobile Header */}
      <div className="bg-white border-b shadow-sm px-4 relative">
        <div className="flex items-center justify-between">
          <Link href={route('sale.index')}>
            <Image
              src={'/assets/media/logo-transparent.png'}
              alt="RSUI Logo"
              mah={65}
              w={110}
              className="cursor-pointer"
            />
          </Link>

          <Sheet open={isOpen} onOpenChange={toggleOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2" style={{ zIndex: 999 }}>
                {isOpen ? (
                  <X className="h-6 w-6" style={{ color: theme.colors.blue[8] }} />
                ) : (
                  <Menu className="h-6 w-6" style={{ color: theme.colors.blue[8] }} />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="w-full p-0 bg-gray-50 top-[65px] h-[calc(100vh-72px)] mobile-nav-sheet"
              style={{ zIndex: 50 }}
            >
              {/* Mobile Menu Header */}
              <div className="bg-white p-4 border-b">
                {/* Quick Access Cards */}
                <div className="grid grid-cols-2 gap-3 mb-4 mt-0">
                  <Link href={route('sale.index')} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                      <BaggageClaim className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-xs font-medium text-gray-700">
                      <div>Sales</div>
                    </div>
                  </Link>

                  <Link href={route('report.index')} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileChartColumn className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-xs font-medium text-gray-700">Laporan Bulanan</div>
                  </Link>
                </div>

                {/* Search Bar */}
                {/* <div className="relative">
                  <Input
                    placeholder={t('pencarian', t_opt)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full pr-10 bg-gray-100 border-0"
                  />
                  <Search
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    onClick={handleSearchIconClick}
                  />
                </div> */}
              </div>

              {/* Menu Items */}
              {/* <div className="bg-white overflow-y-auto">
                {menuItems.map((item, index) => {
                  const isSubmenuOpen = openSubmenu === item.key;
                  return (
                    <div key={item.key}> */}
              {/* @ts-ignore */}
              {/* {item.hasSubmenu ? (
                        <div>
                          <button
                            className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            onClick={() => handleSubmenuToggle(item.key)}
                          >
                            <span className="text-gray-700 font-medium">
                              {item.key === 'beranda' ? 'Beranda' : t(item.key, t_opt)}
                            </span>
                            {isSubmenuOpen ? (
                              <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                            )}
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isSubmenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="bg-gray-50 border-t border-gray-100"> */}
              {/* @ts-ignore */}
              {/* {item.children?.map((child, childIndex) => (
                                <Link key={child.label} href={child.href} onClick={() => setIsOpen(false)}>
                                  <button className="w-full px-8 py-3 text-left hover:bg-gray-100 transition-colors">
                                    <span className="text-gray-600 text-sm">{t(child.label, t_opt)}</span>
                                  </button> */}
              {/* @ts-ignore */}
              {/* {childIndex < (item.children?.length || 0) - 1 && (
                                    <div className="border-b border-gray-200 ml-8" />
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : item.href && item.href !== '#' ? (
                        <Link href={item.href} onClick={() => setIsOpen(false)}>
                          <button className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <span className="text-gray-700 font-medium">
                              {item.key === 'beranda' ? 'Beranda' : t(item.key, t_opt)}
                            </span>
                          </button>
                        </Link>
                      ) : (
                        <button className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <span className="text-gray-700 font-medium">
                            {item.key === 'beranda' ? 'Beranda' : t(item.key, t_opt)}
                          </span>
                        </button>
                      )}
                      {index < menuItems.length - 1 && <div className="border-b border-gray-100" />}
                    </div>
                  );
                })}
              </div> */}

              {/* Bottom Section */}
              <div className="absolute bottom-4 left-4 right-4">
                {canChangeLocale && (
                  <div className="flex items-center justify-center">
                    <LanguageSelector />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
