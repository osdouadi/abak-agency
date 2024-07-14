import * as z from "zod";

export const CategorySchema = z.object({
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
  categoryIcon: z.string(),
  categoryBanner: z.string(),
});
