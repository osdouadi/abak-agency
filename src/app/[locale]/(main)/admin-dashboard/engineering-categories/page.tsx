import CategoryList from "@/containers/dashboard/category-list";
import {
  getEnginneringCategoryList,
} from "@/queries/engineering-category";
import React from "react";

const page = async () => {
  const data = await getEnginneringCategoryList();

  return (
    <>
      <CategoryList data={data} />
    </>
  );
};

export default page;
