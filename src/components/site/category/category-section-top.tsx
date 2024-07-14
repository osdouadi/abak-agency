import SectionHeader from "@/components/global/section-header";
import SectionSubheader from "@/components/global/section-subheader";
import { useTranslations } from "next-intl";
import React from "react";

const CategorySectionTop: React.FC = () => {
  const tHomePage = useTranslations("site.homePage");

  return (
    <>
      <SectionHeader>{tHomePage("categoriesSectionHeader")}</SectionHeader>
      <SectionSubheader>
        {tHomePage("categoriesSectionSubheader")}
      </SectionSubheader>
    </>
  );
};

export default CategorySectionTop;
