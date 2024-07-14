import * as z from "zod";
import { ServiceSchema } from "@/lib/zod-schema/service-schema";

export type ServiceData = z.infer<typeof ServiceSchema>;
