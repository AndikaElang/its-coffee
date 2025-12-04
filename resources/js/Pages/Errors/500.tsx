import AppMeta from '@/components/Meta/AppMeta';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Home, RefreshCw, ServerCrash } from 'lucide-react';
import { useEffect } from 'react';

export default function ServerError({ status = 500, error = 'Server Error' }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(status);
    console.error(error);
  }, [error]);

  return (
    <>
      <AppMeta title="Server Error" />
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-background">
        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">500</h1>
            <h2 className="text-2xl font-semibold tracking-tight">Critical Error</h2>
            <p className="text-muted-foreground">{error || 'Sorry, something went wrong on our servers.'}</p>
          </div>

          <div className="mx-auto w-24 h-24 relative">
            <ServerCrash className="h-24 w-24 text-destructive animate-pulse" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button asChild variant="outline">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
