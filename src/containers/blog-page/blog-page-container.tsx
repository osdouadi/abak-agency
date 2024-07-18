"use client";

import React from "react";
import { useExtractLocaleFromPath } from "@/hooks/useExtractLocaleFromPath";

const BlogPageContainer = ({ data }) => {
  const locale = useExtractLocaleFromPath();
  return (
    <div>
      <div className="h-[60vw] w-full md:h-[45vw]">
        <img
          src={data.blogImage}
          alt={data.SEOSettings.pageTitle.ar}
          className="h-[60vw] w-full md:h-[45vw]"
        />
      </div>
      <div className="py-4 px-5 md:p-10">
        <h2 className="font-semibold text-center md:text-2xl leading-relaxed text-primary opacity-90 pb-4">
          {locale === "ar" ? data.title.ar : data.title.en}
        </h2>
        <p className="md:text-lg leading-relaxed">
          {locale === "ar" ? data.longDescription.ar : data.longDescription.en}
        </p>
      </div>
    </div>
  );
};

export default BlogPageContainer;
