import React from "react";
import BlogPageContainer from "@/containers/blog-page/blog-page-container";
import { getBlogById } from "@/queries/blog";


const page = async ({ params }) => {
  const id = params.id
  const data = await getBlogById(id);
  return (
    <div className="pt-[72px]">
      <BlogPageContainer data={data} />
    </div>
  );
};

export default page;
