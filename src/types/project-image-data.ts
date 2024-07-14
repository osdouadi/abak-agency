import * as z from "zod";
import { ProjectImageSchema } from "@/lib/zod-schema/project-image";

export type ProjectImageData = z.infer<typeof ProjectImageSchema>;
