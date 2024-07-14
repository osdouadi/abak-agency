"use server";

import { connect } from "@/db/database-config";
import ProjectImage from "@/models/project-image.model";
import { ProjectImageData } from "@/types/project-image-data";

export const getProjectImageList = async () => {
  await connect();

  try {
    const projectImageList = await ProjectImage.find({});
    return JSON.stringify(projectImageList);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch categories list");
  }
};

export const getProjectImageById = async (categoryId: string) => {
  await connect();

  try {
    const projectImageById = await ProjectImage.findById(categoryId);

    return JSON.stringify(projectImageById);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch get category details");
  }
};

export const createProjectImage = async (projectImageData: ProjectImageData) => {
  await connect();
  console.log(projectImageData);
  try {
    const projectImageDetails = await ProjectImage.create({
      projectImage: projectImageData.projectImage,
      title: projectImageData.title,
      isDisabled: projectImageData.isDisabled,
    });

    return JSON.stringify(projectImageDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to create category");
  }
};

export const updateProjectImage = async (
  projectImageId: string,
  projectImageData: ProjectImageData
) => {
  await connect();

  try {
    const projectImageDetails = await ProjectImage.findByIdAndUpdate(
      projectImageId,
      projectImageData,
      {
        new: true,
      }
    );
    return JSON.stringify(projectImageDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to update category");
  }
};

export const deleteProjectImage = async (projectImageId: string) => {
  await connect();

  try {
    const projectImageDetails = await ProjectImage.findByIdAndDelete(
      projectImageId
    );
    return JSON.stringify(projectImageDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};

export const deleteProjectImageList = async () => {
  await connect();

  try {
    return await ProjectImage.deleteMany({});
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};
