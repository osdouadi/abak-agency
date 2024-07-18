"use server";

import { connect } from "@/db/database-config";
import EngineeringCategory from "@/models/engineering-category.model";
import EngineeringService from "@/models/engineering-service.model";
import { CategoryData } from "@/types/category-data";

export const getEnginneringCategoryList = async () => {
  await connect();

  try {
    const enginneringCategoriesList = await EngineeringCategory.find({});
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
    ).populate({
      path: "services",
      select: "title category",
    });

    return JSON.parse(JSON.stringify(engineeringCategoryById));
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
    return JSON.parse(JSON.stringify(engineeringCategoryDetails));
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
    return JSON.parse(JSON.stringify(engineeringCategoryDetails));
  } catch (error: any) {
    throw new Error(error.message || "Failed to update category");
  }
};

export const deleteEngineeringCategory = async (categoryId: string) => {
  await connect();

  try {
    const engineeringCategoryDetails =
      await EngineeringCategory.findByIdAndDelete(categoryId);
    if (!engineeringCategoryDetails) {
      throw new Error("Category not found!");
    }

    const services = await EngineeringService.find({ category: categoryId });

    for (const service of services) {
      service.category = null;
      await service.save();
    }

    return JSON.parse(JSON.stringify(engineeringCategoryDetails));
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};

export const deleteEngineeringCategoriesList = async (): Promise<{
  message: string;
}> => {
  await connect();

  try {
    const categories = await EngineeringCategory.find({});
    const categoryIds = categories.map((category) => category._id.toString());

    await EngineeringCategory.deleteMany({});

    await EngineeringService.updateMany(
      { category: { $in: categoryIds } },
      { $unset: { category: "" } }
    );

    return { message: "All categories deleted and services updated." };
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete categories");
  }
};
