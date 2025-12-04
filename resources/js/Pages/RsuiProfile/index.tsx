import AppMeta from '@/components/Meta/AppMeta';
import About from '@/components/RsuiProfile/About';
import EnvSustainArticle from '@/components/RsuiProfile/EnvSustainArticle';
import Hero from '@/components/RsuiProfile/Hero';
import QualityIndicator from '@/components/RsuiProfile/QualityIndicator';
import RSUICare from '@/components/RsuiProfile/RSUICARE';
import Structural from '@/components/RsuiProfile/Structural';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ViewRsuiProfile } from '@/types/page-params';

export default function Page(props: ViewRsuiProfile) {
  return (
    <>
      <AppMeta title="Profil RSUI" ogImage="/assets/media/logo-full-white.png" />
      <PublicLayout {...props}>
        <Hero />
        <About {...props} ns="rsuiProfile" />
        <Structural {...props} ns="rsuiProfile" />
        <RSUICare {...props} ns="rsuiProfile" />
        <EnvSustainArticle {...props} ns="rsuiProfile" articles={props.data.articles} />
        <QualityIndicator {...props.data.qualityIndicator} ns="rsuiProfile" />
      </PublicLayout>
    </>
  );
}
