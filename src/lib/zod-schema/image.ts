import * as z from "zod";

export const ImageSchema = z.object({
  galleryImage: z.string(),
  title: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  isDisabled: z.boolean(),
});
