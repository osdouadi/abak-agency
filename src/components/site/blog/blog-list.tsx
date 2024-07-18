"use client";

import React from "react";
import { useExtractLocaleFromPath } from "@/hooks/useExtractLocaleFromPath";
import { SkeletonCard } from "@/components/global/skeleton-card";
import BlogCard from "./blog-card";

type Category = {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  categoryIcon: string;
};

type CategoryListProps = {
  blogs: Category[];
  isLoading: boolean;
  error: any;
};

const BlogList: React.FC<CategoryListProps> = ({ blogs, isLoading, error }) => {
  const locale = useExtractLocaleFromPath();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 py-4">
      {isLoading ? (
        <div className="flex items-center gap-5 flex-col md:flex-row">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : error ? (
        <div>Somthing went wrong</div>
      ) : (
        blogs.map((item, index) => (
          <BlogCard
            key={index}
            title={locale === "ar" ? item.title.ar : item.title.en}
            shortDescription={
              locale === "ar"
                ? item.shortDescription.ar
                : item.shortDescription.en
            }
            id={item.id}
            blogImage={item.blogImage}
          />
        ))
      )}
    </div>
  );
};

export default BlogList;
