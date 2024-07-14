import * as z from "zod";

export const ServiceSchema = z.object({
  title: z.object({
    ar: z.string().min(2, { message: "Category name in Arabic is required." }),
    en: z.string().min(2, { message: "Category name in English is required." }),
  }),
  description: z.object({
    ar: z
      .string()
      .min(2, { message: "Category description in Arabic is required." }),
    en: z
      .string()
      .min(2, { message: "Category description in English is required." }),
  }),
  category: z.string(),
  SEOSettings: z.object({
    pageTitle: z.object({
      ar: z
        .string()
        .min(2, { message: "Category description in Arabic is required." }),
      en: z
        .string()
        .min(2, { message: "Category description in English is required." }),
    }),
    pageDescription: z.object({
      ar: z
        .string()
        .min(2, { message: "Category description in Arabic is required." }),
      en: z
        .string()
        .min(2, { message: "Category description in English is required." }),
    }),
  }),
  serviceIcon: z.string(),
  serviceBanner: z.string(),
});
