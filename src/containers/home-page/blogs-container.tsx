import React from "react";

import BlogHeaderGroup from "@/components/site/blog/blog-header-group";
import BlogList from "@/components/site/blog/blog-list";
import { getBlogList } from "@/queries/blog";

const BlogsContainer = async () => {
  let blogData = [];
  let isLoading = true;
  let error = null;
  try {
    blogData = await getBlogList();
  } catch (err: any) {
    error = err.message;
  } finally {
    isLoading = false;
  }

  return (
    <section className="min-h-screen px-5 md:px-10 mt-7 md:mt-12">
      <div className="text-center mx-auto">
        <BlogHeaderGroup />
      </div>
        <BlogList blogs={blogData} isLoading={isLoading} error={error} />
    </section>
  );
};

export default BlogsContainer;
