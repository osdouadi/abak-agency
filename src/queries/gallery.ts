"use server";

import { connect } from "@/db/database-config";
import Image from "@/models/gallery.model";
import { ImageData } from "@/types/image-data";

export const getGallery = async () => {
  await connect();

  try {
    const galleryList = await Image.find({});
    return JSON.parse(JSON.stringify(galleryList));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch categories list");
  }
};

export const getImageById = async (imageId: string) => {
  await connect();

  try {
    const imageById = await Image.findById(imageId);

    return JSON.parse(JSON.stringify(imageById));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch get category details");
  }
};

export const createImage = async (
  imageData: ImageData
) => {
  await connect();
  try {
    const imageDetails = await Image.create({
      galleryImage: imageData.galleryImage,
      title: {
        ar: imageData.title.ar,
        en: imageData.title.en,
      },
      isDisabled: imageData.isDisabled,
    });

    return JSON.parse(JSON.stringify(imageDetails));
  } catch (error: any) {
    throw new Error(error.message || "Failed to create category");
  }
};

export const updateImage = async (
  imageId: string,
  imageData: ImageData
) => {
  await connect();

  try {
    const imageDetails = await Image.findByIdAndUpdate(
      imageId,
      imageData,
      {
        new: true,
      }
    );
   return JSON.parse(JSON.stringify(imageDetails));
  } catch (error: any) {
    throw new Error(error.message || "Failed to update category");
  }
};

export const deleteImage = async (imageId: string) => {
  await connect();

  try {
    const imageDetails = await Image.findByIdAndDelete(imageId);
    return JSON.parse(JSON.stringify(imageDetails));
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};

export const deleteGallery = async () => {
  await connect();

  try {
    return await Image.deleteMany({});
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};
