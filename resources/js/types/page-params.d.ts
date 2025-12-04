import { PageProps } from '.';
import {
  Accomplishment,
  ArticleWithCategoryAndFile,
  Doctor,
  EnvironmentSustainabilityArticle,
  Insurance,
  News,
  PatientExperience,
  PolyClinic,
  PopUpSpecialOffer,
  SearchAll,
  Slider,
  SpecialOffer,
  Specialist,
  VisualEducationWithCategory,
  paginatedData,
} from './models';

export type AuthParams = PageProps<{ recaptchaSiteKey: string; bypassRecaptcha: boolean }>;
export type ViewHomePage = PageProps<{
  data: {
    popupSpecialOffer: PopUpSpecialOffer & {
      special_offer: SpecialOffer;
    };
    sliders: Slider[];
    doctors: Doctor[];
    centerOfExcellences: PolyClinic[];
    specialOffers: SpecialOffer[];
    news: News[];
    patientExperiences: PatientExperience[];
    insurances: Insurance[];
    accomplishments: Accomplishment[];
  };
}>;

export type QualityIndicatorProps = {
  category: { id: number; kategori_nama: string }[];
  dataCapaian: {
    chart_data_0: string;
    chart_data_1: string;
    chart_data_2: string;
    chart_data_3: string;
    chart_data_4: string;
    chart_data_5: string;
    chart_data_6: string;
    chart_data_7: string;
    chart_data_8: string;
    chart_data_9: string;
    chart_data_10: string;
    chart_data_11: string;
    chart_data_12: string;
  };
  dataTarget: {
    chart_data_0: string;
    chart_data_1: string;
    chart_data_2: string;
    chart_data_3: string;
    chart_data_4: string;
    chart_data_5: string;
    chart_data_6: string;
    chart_data_7: string;
    chart_data_8: string;
    chart_data_9: string;
    chart_data_10: string;
    chart_data_11: string;
    chart_data_12: string;
  };
  qualityIndicatorData: {
    tahun: number;
    capaian: string;
    kode_imut: string;
    target: string;
  }[];
  selectedYear: string;
  yearList: { tahun: number }[];
};
export type ViewRsuiProfile = PageProps<{
  data: {
    articles: EnvironmentSustainabilityArticle[];
    qualityIndicator: QualityIndicatorProps;
  };
}>;

export type GenericViewPage<T> = PageProps<{
  data: T;
}>;

export type ViewSearchPage = PageProps<{
  data: {
    disorderDiseases: SearchAll[];
    popularArticles: SearchAll[];
    news: SearchAll[];
    visualEducations: SearchAll[];
    activities: SearchAll[];
    promotions: SearchAll[];
    polyClinics: SearchAll[];
    trainings: SearchAll[];
  };
  keyword?: string;
}>;

export type ViewPaginateGeneric<T> = PageProps<{
  data: paginatedData<T>;
  keyword?: string;
}>;

export type ViewPaginateArticle = PageProps<{
  articles: paginatedData<ArticleWithCategoryAndFile>;
  categories: CategoryList[];
  selectedCategory?: string;
}>;

export type ViewPaginateVisualEducation = PageProps<{
  visualEducations: paginatedData<VisualEducationWithCategory>;
  selectedCategory?: string;
}>;

export type ViewFindDoctor = PageProps<{
  doctors: Doctor[];
  specialists: Specialist[];
}>;

export type MedDevData = {
  year: { tahun_group: number }[];
  yearNow: number;
  medDevData: {
    jenis_pengujian: string;
    nilai: number;
    sequence: number;
  }[];
  dataJson: string;
};
