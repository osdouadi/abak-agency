import { BlogSchema } from "@/lib/zod-schema/blog-schema";
import * as z from "zod";

export type BlogData = z.infer<typeof BlogSchema>;
