import { LAPTOP_BREAKPOINT } from '@/lib/constants';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';

interface FloatBoxMobileProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export default function FloatBoxMobile({ label, href, icon = <IconArrowRight /> }: FloatBoxMobileProps) {
  const matchLaptop = useMediaQuery(LAPTOP_BREAKPOINT);
  if (!matchLaptop) return null;

  return (
    <a href={href} target="_blank">
      <button
        className="
          fixed bottom-6 right-6 z-50
          flex items-center gap-2
          px-4 py-2 rounded-lg shadow-lg
          bg-orange-600 text-white font-bold
          hover:bg-orange-700 transition
        "
      >
        <span>{label}</span>
        {icon}
      </button>
    </a>
  );
}
