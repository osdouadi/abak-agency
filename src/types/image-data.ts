import { ImageSchema } from "@/lib/zod-schema/image";
import * as z from "zod";

export type ImageData = z.infer<typeof ImageSchema>;
