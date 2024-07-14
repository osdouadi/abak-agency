"use server";

import { connect } from "@/db/database-config";
import EngineeringCategory from "@/models/engineering-category.model";
import { CategoryData } from "@/types/category-data";

export const getEnginneringCategoryList = async () => {
  await connect();

  try {
    const enginneringCategoriesList = await EngineeringCategory.find({}).lean();
    return JSON.parse(JSON.stringify(enginneringCategoriesList));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch categories list");
  }
};

export const getEngineeringCategoryById = async (categoryId: string) => {
  await connect();

  try {
    const engineeringCategoryById = await EngineeringCategory.findById(
      categoryId
    );

    return JSON.stringify(engineeringCategoryById);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch get category details");
  }
};

export const createEngineeringCategory = async (categoryData: CategoryData) => {
  await connect();

  try {
    const engineeringCategoryDetails = await EngineeringCategory.create({
      title: {
        ar: categoryData.title.ar,
        en: categoryData.title.en,
      },
      description: {
        ar: categoryData.description.ar,
        en: categoryData.description.en,
      },
      categoryIcon: categoryData.categoryIcon,
      categoryBanner: categoryData.categoryBanner,
      SEOSettings: {
        pageTitle: {
          ar: categoryData.SEOSettings.pageTitle.ar,
          en: categoryData.SEOSettings.pageTitle.en,
        },
        pageDescription: {
          ar: categoryData.SEOSettings.pageDescription.ar,
          en: categoryData.SEOSettings.pageDescription.en,
        },
      },
    });
    return JSON.stringify(engineeringCategoryDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to create category");
  }
};

export const updateEngineeringCategory = async (
  categoryId: string,
  categoryData: CategoryData
) => {
  await connect();

  try {
    const engineeringCategoryDetails =
      await EngineeringCategory.findByIdAndUpdate(categoryId, categoryData, {
        new: true,
      });
    return JSON.stringify(engineeringCategoryDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to update category");
  }
};

export const deleteEngineeringCategory = async (categoryId: string) => {
  await connect();

  try {
    const engineeringCategoryDetails =
      await EngineeringCategory.findByIdAndDelete(categoryId);
    return JSON.stringify(engineeringCategoryDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};

export const deleteEngineeringCategoriesList = async () => {
  await connect();

  try {
    return await EngineeringCategory.deleteMany({});
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};
