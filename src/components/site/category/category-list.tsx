"use client";

import CategoryCard from "./category-card";
import React from "react";
import { useExtractLocaleFromPath } from "@/hooks/useExtractLocaleFromPath";
import { SkeletonCard } from "@/components/global/skeleton-card";

type Category = {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  categoryIcon: string;
};

type CategoryListProps = {
  categories: Category[];
  isLoading: boolean;
  error: any;
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  isLoading,
  error,
}) => {
  const locale = useExtractLocaleFromPath();

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-7 md:gap-14">
      {isLoading ? (
        <div className="flex items-center gap-5 flex-col md:flex-row">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : error ? (
        <div>Somthing went wrong</div>
      ) : (
        categories.map((item, index) => (
          <CategoryCard
            key={index}
            id={item.id}
            title={locale === "ar" ? item.title.ar : item.title.en}
            icon={item.categoryIcon}
          />
        ))
      )}
    </div>
  );
};

export default CategoryList;
