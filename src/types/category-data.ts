import * as z from "zod";
import { CategorySchema } from "@/lib/zod-schema/category-schema";

export type CategoryData = z.infer<typeof CategorySchema>;
