import { WorkInProgressPage } from '@/components/wip/work-in-progress-page';
import { PageProps } from '@/types';

export default function Page(props: PageProps<{ estimatedCompletion: string; progress: number }>) {
  const { estimatedCompletion, progress } = props;
  return (
    <WorkInProgressPage
      title="Feature Under Development"
      description="We're working hard to bring you an amazing new feature."
      estimatedCompletion={estimatedCompletion}
      progress={progress}
    />
  );
}
