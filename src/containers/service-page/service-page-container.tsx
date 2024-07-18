"use client";

import React from "react";
import { useExtractLocaleFromPath } from "@/hooks/useExtractLocaleFromPath";
import ServiceOrder from "@/components/forms/service-order";
import PageTitle from "@/components/global/page-title";
import PageDescription from "@/components/global/page-description";

const ServicePageContainer = ({ data }) => {
  const locale = useExtractLocaleFromPath();

  return (
    <>
      <div className="h-[50vw] w-full md:h-[30vw] relative">
        <img
          src={data.serviceBanner}
          alt={data.SEOSettings.pageTitle.ar}
          className="h-[50vw] w-full md:h-[30vw] absolute"
        />
      </div>
      <div className="py-4 px-4 md:p-10">
        <div className="pb-5">
          <PageTitle>
            {locale === "ar" ? data.title.ar : data.title.en}
          </PageTitle>
          <PageDescription>
            {locale === "ar" ? data.description.ar : data.description.en}
          </PageDescription>
        </div>
        <ServiceOrder />
      </div>
    </>
  );
};

export default ServicePageContainer;
