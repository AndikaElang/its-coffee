'use client';

import { cn } from '@/lib/utils';

const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default function AlphabetFilter({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (letter: string) => void;
}) {
  return (
    <div
      aria-label="Filter berdasarkan huruf awal"
      className="grid grid-cols-5 gap-2 xs:grid-cols-6 sm:grid-cols-10 md:grid-cols-13 lg:gap-4 lg:grid-cols-13"
    >
      {letters.map((l) => (
        <LetterButton key={l} letter={l} isActive={selected === l} onClick={() => onSelect(l)} />
      ))}
    </div>
  );
}

function LetterButton({ letter, isActive, onClick }: { letter: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={`Pilih huruf ${letter}`}
      onClick={onClick}
      className={cn(
        'h-12 w-12 select-none rounded-xl transition-all duration-200 cursor-pointer',
        'bg-[#0072bc] text-brand-foreground shadow-sm',
        'hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2',
        'lg:h-16 lg:w-16 lg:text-lg lg:rounded-2xl',
        isActive && 'ring-2 ring-brand/70 ring-offset-2 shadow-md lg:shadow-lg lg:ring-offset-4',
      )}
    >
      <span className="font-bold text-xl">{letter}</span>
    </button>
  );
}
