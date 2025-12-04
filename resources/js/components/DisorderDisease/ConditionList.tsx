'use client';

import { DisorderDisease } from '@/types/models';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ConditionsList({ items, selected }: { items: DisorderDisease[]; selected: string }) {
  const { t } = useTranslation();

  return (
    <div>
      <p className="mb-4 text-lg font-semibold text-foreground">{t('disorder-disease.list', { ns: 'infoMedia' })}</p>

      <div className="mb-4 animate-in fade-in-0 zoom-in-95 duration-300 text-4xl font-extrabold leading-none text-accent-strong">
        {selected}
      </div>

      <ul className="divide-y divide-border rounded-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
        {items.map((data, index) => (
          <li key={data.id} className="animate-in fade-in-0 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
            <Link href={route('info-media.disorderDisease.show', data.slug)}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-3 text-left transition-colors hover:bg-accent cursor-pointer p-2"
              >
                <span className="text-pretty">{data.judul}</span>
                <ChevronRight className="h-5 w-5 text-accent-strong" aria-hidden="true" />
              </button>
            </Link>
          </li>
        ))}
        {items.length === 0 && (
          <li className="animate-in fade-in-0 duration-300 py-3 text-muted-foreground">
            {t('disorder-disease.empty', { ns: 'infoMedia' })}
          </li>
        )}
      </ul>
    </div>
  );
}
