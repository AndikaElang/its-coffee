import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, HardHat } from 'lucide-react';

interface WorkInProgressSectionProps {
  title?: string;
  description?: string;
  estimatedCompletion?: string;
  progress?: number | null;
  isIndeterminate?: boolean;
}

export function WorkInProgressSection({
  title = 'Coming Soon',
  description = 'This feature is currently under development.',
  estimatedCompletion = 'Soon',
  progress = 65,
  isIndeterminate = false,
}: WorkInProgressSectionProps) {
  return (
    <Card className="border-t-4 border-yellow-400">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="p-3 bg-yellow-100 rounded-full">
            <HardHat className="h-6 w-6 text-yellow-600" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>

            <div className="mt-3 space-y-1">
              {isIndeterminate ? (
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full animate-indeterminate-progress"></div>
                </div>
              ) : (
                <Progress value={progress ?? 0} className="h-1.5" />
              )}
              <div className="flex justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Estimated: {estimatedCompletion}</span>
                </div>
                {!isIndeterminate && progress !== null && <span>{progress}% complete</span>}
                {isIndeterminate && <span>In progress</span>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
