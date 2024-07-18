"use client";

import React from "react";
import { useExtractLocaleFromPath } from "@/hooks/useExtractLocaleFromPath";
import { useParams } from "next/navigation";
import PageTitle from "@/components/global/page-title";
import PageDescription from "@/components/global/page-description";
import Banner from "@/components/global/banner";
import ServiceCard from "@/components/global/service-card";

const CategoryPageContainer = ({ data }) => {
  const params = useParams();
  const categoryId = params.id;
  const locale = useExtractLocaleFromPath();

  return (
    <>
      <Banner
        src={data.categoryBanner}
        alt={
          locale === "ar"
            ? data.SEOSettings.pageTitle.ar
            : data.SEOSettings.pageTitle.en
        }
      />
      <div className="py-5 px-4 md:p-10">
        <PageTitle>{locale === "ar" ? data.title.ar : data.title.en}</PageTitle>
        <PageDescription>
          {locale === "ar" ? data.description.ar : data.description.en}
        </PageDescription>
        <div className="flex justify-center">
          <h3 className="text-lg md:text-2xl text-primary font-medium pb-2.5 pt-4 md:pb-4 md:pt-6">
            جميع الخدمات
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {data?.services.map((item, index) => (
            <ServiceCard
              key={index}
              index={index}
              title={locale === "ar" ? item.title.ar : item.title.en}
              categoryId={categoryId}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPageContainer;
