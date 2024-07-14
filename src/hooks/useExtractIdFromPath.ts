"use client";

import { usePathname } from "next/navigation";

export const useExtractIdFromPath = () => {
  const path = usePathname();
  const id = path.split("/").pop();
  return { id };
};
