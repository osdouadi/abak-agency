import * as z from "zod";

export const BlogSchema = z.object({
  title: z.object({
    ar: z.string().min(2, { message: "Category name in Arabic is required." }),
    en: z.string().min(2, { message: "Category name in English is required." }),
  }),
  shortDescription: z.object({
    ar: z
      .string()
      .min(2, { message: "Category description in Arabic is required." }),
    en: z
      .string()
      .min(2, { message: "Category description in English is required." }),
  }),
  longDescription: z.object({
    ar: z
      .string()
      .min(2, { message: "Category description in Arabic is required." }),
    en: z
      .string()
      .min(2, { message: "Category description in English is required." }),
  }),
  blogImage: z.string(),
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
});
