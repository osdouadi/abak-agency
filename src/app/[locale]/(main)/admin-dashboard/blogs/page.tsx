import BlogList from "@/containers/dashboard/blog-list";
import { getBlogList } from "@/queries/blog";
import React from "react";

const page = async () => {
  const data = await getBlogList();

  return (
    <>
      <BlogList data={data} />
    </>
  );
};

export default page;
