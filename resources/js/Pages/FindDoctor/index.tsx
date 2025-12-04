import FindDoctor from '@/components/FindDoctor';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ViewFindDoctor } from '@/types/page-params';

export default function Page(props: ViewFindDoctor) {
  return (
    <PublicLayout {...props}>
      <FindDoctor {...props} />
    </PublicLayout>
  );
}
