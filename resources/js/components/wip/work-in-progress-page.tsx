'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Construction, HardHat } from 'lucide-react';

interface WorkInProgressPageProps {
  title?: string;
  description?: string;
  estimatedCompletion?: string;
  progress?: number | null;
  returnUrl?: string;
  returnLabel?: string;
  isIndeterminate?: boolean;
}

export function WorkInProgressPage({
  title = 'Work In Progress',
  description = 'This section of our website is currently under development.',
  estimatedCompletion = 'Soon',
  progress = 65,
  returnUrl = '/',
  returnLabel = 'Return to Home',
  isIndeterminate = false,
}: WorkInProgressPageProps) {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <Card className="max-w-2xl w-full p-6 shadow-lg border-t-4 border-yellow-400 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 text-yellow-500">
          <Construction className="h-12 w-12 animate-pulse" />
        </div>

        <div className="flex flex-col items-center text-center space-y-6 mb-8">
          <div className="p-4 bg-yellow-100 rounded-full">
            <HardHat className="h-12 w-12 text-yellow-600" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground max-w-md">{description}</p>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              {!isIndeterminate && progress !== null && <span>{progress}%</span>}
              {isIndeterminate && <span>In progress</span>}
            </div>
            {isIndeterminate ? (
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full animate-indeterminate-progress"></div>
              </div>
            ) : (
              <Progress value={progress ?? 0} className="h-2" />
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Estimated completion: <span className="font-medium text-foreground">{estimatedCompletion}</span>
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button className="cursor-pointer" variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button asChild>
            <Link href={returnUrl}>{returnLabel}</Link>
          </Button>
        </div>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} RSUI. All rights reserved.</p>
      </div>
    </div>
  );
}
