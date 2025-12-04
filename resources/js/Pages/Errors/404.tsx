'use client';

import AppMeta from '@/components/Meta/AppMeta';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Home } from 'lucide-react';

export default function Page() {
  return (
    <>
      <AppMeta title="404 - Halaman Tidak Ditemukan" />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
            <h2 className="text-2xl font-semibold tracking-tight">Halaman Tidak Ditemukan</h2>
            <p className="text-muted-foreground">
              Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman tersebut mungkin telah dipindahkan,
              dihapus, atau memang tidak pernah ada.
            </p>
          </div>

          <div className="mx-auto w-24 h-24 relative mb-12">
            <div className="absolute inset-0 border-4 border-muted rounded-full animate-pulse"></div>
            <div className="absolute inset-3 border-2 border-muted-foreground rounded-full animate-ping"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Ke Beranda
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
