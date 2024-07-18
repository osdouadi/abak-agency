import { ServiceOrderSchema } from "@/lib/zod-schema/service-order-schema";
import * as z from "zod";

export type ServiceOrderData = z.infer<typeof ServiceOrderSchema>;
