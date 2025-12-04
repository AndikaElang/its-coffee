import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';
import { ReactElement } from 'react';
import { Id, Us } from 'react-flags-select';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const flagMap: Record<string, ReactElement> = {
    id: <Id />,
    en: <Us />,
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-blue-200">
          {/* <Globe className="w-4 h-4" /> */}
          {flagMap[i18n.language] || <Globe className="w-4 h-4" />}
          <span>{i18n.language.toUpperCase()}</span>
          <ChevronDown className="w-3 h-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleLanguageChange('id')}>Indonesia</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
