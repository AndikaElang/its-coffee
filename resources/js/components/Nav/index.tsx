import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { LAPTOP_BREAKPOINT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import MobileNav from './Mobile';

export default function Nav() {
  const { t } = useTranslation();
  const [isSticky, setIsSticky] = React.useState(false);
  const theme = useMantineTheme();
  const currentPath = route().current();
  const t_opt = { ns: 'nav' };
  const canChangeLocale = false;
  const matchLaptop = useMediaQuery(LAPTOP_BREAKPOINT);

  const navItems = [
    {
      label: 'Sales',
      href: route('sale.index'), // example route, replace with your own
      routeName: 'sale.index',
    },
    {
      label: 'Laporan Bulanan',
      href: route('report.index'),
      routeName: 'report.index',
    },
  ];

  const isActive = (routeName: string) => {
    return currentPath === routeName;
  };

  if (matchLaptop) {
    return (
      <div
        className={cn('w-full transition-all duration-300', isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative')}
      >
        <MobileNav theme={theme} currentPath={currentPath ?? ''} navItems={navItems} />
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
        {/* Main Navigation */}
        <div className="bg-white border-b shadow-sm px-4 py-2">
          <div className="mx-auto flex items-center justify-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'nav-menu-title transition-colors',
                        isActive(item.routeName)
                          ? 'text-[#0072bc] font-semibold border-b-2 border-[#0072bc]'
                          : 'text-gray-600 hover:text-blue-500',
                      )}
                    >
                      <Link href={item.href}>{t(item.label, t_opt)}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>

      {/* Placeholder div to prevent content jumping when navbar becomes fixed */}
      {isSticky && <div className="h-[3rem]" />}
    </>
  );
}
