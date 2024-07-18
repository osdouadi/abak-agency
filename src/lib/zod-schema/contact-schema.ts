import * as z from "zod";

export const ContactSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  letterTitle: z.string(),
  letterSubject: z.string(),
});
