import Accomplishments from '@/components/Homepage/Accomplishments';
import COE from '@/components/Homepage/COE';
import Description from '@/components/Homepage/Description';
import Facility from '@/components/Homepage/Facility';
import Hero from '@/components/Homepage/Hero';
import Insurance from '@/components/Homepage/Insurance';
import NewsArticle from '@/components/Homepage/NewsArticle';
import PatientExperience from '@/components/Homepage/PatientExperience';
import Popup from '@/components/Homepage/Popup';
import Promotion from '@/components/Homepage/Promotion';
import Statistic from '@/components/Homepage/Statistic';
import AppMeta from '@/components/Meta/AppMeta';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ViewHomePage } from '@/types/page-params';

export default function Page(props: ViewHomePage) {
  return (
    <>
      <Popup {...props} ns="homepage" specialOffer={props.data.popupSpecialOffer.special_offer} />
      <AppMeta title="" />
      <PublicLayout {...props}>
        <Hero
          {...props}
          ns="homepage"
          sliders={props.data.sliders}
          doctors={props.data.doctors}
          polyclinics={props.data.centerOfExcellences}
        />
        <Description {...props} ns="homepage" />
        <Statistic {...props} ns="homepage" />
        <COE {...props} ns="homepage" polyclinics={props.data.centerOfExcellences} />
        <Facility {...props} ns="homepage" />
        <Promotion {...props} ns="homepage" specialOffers={props.data.specialOffers} />
        <NewsArticle {...props} ns="homepage" news={props.data.news} />
        <PatientExperience {...props} ns="homepage" patientExperiences={props.data.patientExperiences} />
        <Insurance {...props} ns="homepage" insurances={props.data.insurances} />
        <Accomplishments {...props} ns="homepage" accomplishments={props.data.accomplishments} />
      </PublicLayout>
    </>
  );
}
