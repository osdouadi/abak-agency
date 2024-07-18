import SectionHeader from "@/components/global/section-header";
import SectionSubheader from "@/components/global/section-subheader";
import { useTranslations } from "next-intl";
import React from "react";

const BlogHeaderGroup: React.FC = () => {
  const tHeaderGroup = useTranslations("site.headerGroups");

  return (
    <>
      <SectionHeader>{tHeaderGroup("blogsHeader")}</SectionHeader>
      <SectionSubheader>{tHeaderGroup("blogsSubheader")}</SectionSubheader>
    </>
  );
};

export default BlogHeaderGroup;
