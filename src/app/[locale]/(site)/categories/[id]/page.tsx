import React from "react";
import { getEngineeringCategoryById } from "@/queries/engineering-category";
import CategoryPageContainer from "@/containers/category-page/category-page-container";

const page = async ({ params }) => {
  const id = params.id;
  const data = await getEngineeringCategoryById(id);
  return (
    <>
      <CategoryPageContainer data={data} />
    </>
  );
};

export default page;
