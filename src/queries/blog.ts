"use server";

import { connect } from "@/db/database-config";
import Blog from "@/models/blog.model";
import { BlogData } from "@/types/blog-data";

export const getBlogList = async () => {
  await connect();

  try {
    const blogList = await Blog.find({});
    return JSON.stringify(blogList);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch categories list");
  }
};

export const getBlogById = async (blogId: string) => {
  await connect();

  try {
    const blogById = await Blog.findById(blogId);

    return JSON.stringify(blogById);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch get category details");
  }
};

export const createBlog = async (blogData: BlogData) => {
  await connect();
  try {
    const blogDetails = await Blog.create({
      title: {
        ar: blogData.title.ar,
        en: blogData.title.en,
      },
      shortDescription: {
        ar: blogData.shortDescription.ar,
        en: blogData.shortDescription.en,
      },
      longDescription: {
        ar: blogData.longDescription.ar,
        en: blogData.longDescription.en,
      },
      blogImage: blogData.blogImage,
      SEOSettings: {
        pageTitle: {
          ar: blogData.SEOSettings.pageTitle.ar,
          en: blogData.SEOSettings.pageTitle.en,
        },
        pageDescription: {
          ar: blogData.SEOSettings.pageDescription.ar,
          en: blogData.SEOSettings.pageDescription.en,
        },
      },
    });

    return JSON.stringify(blogDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to create category");
  }
};

export const updateBlog = async (blogId: string, blogData: BlogData) => {
  await connect();

  try {
    const blogDetails = await Blog.findByIdAndUpdate(blogId, blogData, {
      new: true,
    });
    return JSON.stringify(blogDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to update category");
  }
};

export const deleteBlog = async (blogId: string) => {
  await connect();

  try {
    const blogDetails = await Blog.findByIdAndDelete(
      blogId
    );
    return JSON.stringify(blogDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};

export const deleteBlogList = async () => {
  await connect();

  try {
    return await Blog.deleteMany({});
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};
