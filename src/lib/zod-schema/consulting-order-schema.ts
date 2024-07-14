import * as z from "zod";

export const ConsultingOrderSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  city: z.string(),
  address: z.string(),
  date: z.string(),
});
