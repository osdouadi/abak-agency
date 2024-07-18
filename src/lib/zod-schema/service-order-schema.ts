import * as z from "zod";

export const ServiceOrderSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  city: z.string(),
  address: z.string(),
  serviceId: z.string(),
  additionalNotes: z.string(),
});
