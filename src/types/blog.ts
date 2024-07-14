export type Blog = {
  id: string;
  _id: string;
  title: {
    ar: string;
    en: string;
  };
  shortDescription: {
    ar: string;
    en: string;
  };
  longDescription: {
    ar: string;
    en: string;
  };
  blogImage: string;
  SEOSettings: {
    pageTitle: {
      ar: string;
      en: string;
    };
    pageDescription: {
      ar: string;
      en: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
