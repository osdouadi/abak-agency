import * as z from "zod";
import { ContactSchema } from "@/lib/zod-schema/contact-schema";

export type ContactData = z.infer<typeof ContactSchema>;
