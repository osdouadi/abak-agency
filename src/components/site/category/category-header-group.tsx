import SectionHeader from "@/components/global/section-header";
import SectionSubheader from "@/components/global/section-subheader";
import { useTranslations } from "next-intl";
import React from "react";

const CategoryHeaderGroup: React.FC = () => {
  const tHeaderGroup = useTranslations("site.headerGroups");

  return (
    <>
      <SectionHeader>{tHeaderGroup("categoriesHeader")}</SectionHeader>
      <SectionSubheader>{tHeaderGroup("categoriesSubheader")}</SectionSubheader>
    </>
  );
};

export default CategoryHeaderGroup;
