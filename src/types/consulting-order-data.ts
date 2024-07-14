import { ConsultingOrderSchema } from "@/lib/zod-schema/consulting-order-schema";
import * as z from "zod";

export type ConsultingOrderData = z.infer<typeof ConsultingOrderSchema>;
