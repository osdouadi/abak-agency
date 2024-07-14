import * as z from "zod";

export const ProjectImageSchema = z.object({
  projectImage: z.string(),
  title: z.string(),
  isDisabled: z.boolean()
});
