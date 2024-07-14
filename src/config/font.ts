// Font configurations

import { DM_Sans, Tajawal } from "next/font/google";

export const fontArabic = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800"],
  subsets: ["arabic"],

});

export const fontLatin = DM_Sans({
  weight: ["200", "300", "400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});