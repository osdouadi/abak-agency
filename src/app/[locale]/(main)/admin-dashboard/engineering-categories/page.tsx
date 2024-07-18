import React from "react";
import CategoryList from "@/containers/dashboard/category-list";
import {
  getEnginneringCategoryList,
} from "@/queries/engineering-category";

const page = async () => {
  const data = await getEnginneringCategoryList();

  return (
    <>
      <CategoryList data={data} />
    </>
  );
};

export default page;
