"use server";

import { connect } from "@/db/database-config";
import EngineeringCategory from "@/models/engineering-category.model";
import EngineeringService from "@/models/engineering-service.model";
import { ServiceData } from "@/types/service-data";

export const getEngineeringServiceList = async () => {
  await connect();

  try {
    const engineeringServiceList = await EngineeringService.find({}).populate({
      path: "category",
      select: "title category",
    });
    return JSON.parse(JSON.stringify(engineeringServiceList));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch service list");
  }
};

export const getEngineeringServiceById = async (serviceId: string) => {
  await connect();

  try {
    const engineeringServiceById = await EngineeringService.findById(serviceId);
    return JSON.parse(JSON.stringify(engineeringServiceById));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch get category details");
  }
};

export const createEngineeringService = async (serviceData: ServiceData) => {
  await connect();

  try {
    const engineeringServiceDetails = await EngineeringService.create({
      title: {
        ar: serviceData.title.ar,
        en: serviceData.title.en,
      },
      description: {
        ar: serviceData.description.ar,
        en: serviceData.description.en,
      },
      serviceIcon: serviceData.serviceIcon,
      serviceBanner: serviceData.serviceBanner,
      category: serviceData.category,
      SEOSettings: {
        pageTitle: {
          ar: serviceData.SEOSettings.pageTitle.ar,
          en: serviceData.SEOSettings.pageTitle.en,
        },
        pageDescription: {
          ar: serviceData.SEOSettings.pageDescription.ar,
          en: serviceData.SEOSettings.pageDescription.en,
        },
      },
    });

    const categoryId = serviceData.category;
    let category = await EngineeringCategory.findById(categoryId);
    if (!category) {
      throw new Error("Category not found!");
    }

    if (!category.services.includes(engineeringServiceDetails._id)) {
      category.services.push(engineeringServiceDetails._id);
      await category.save();
    }

    return JSON.parse(JSON.stringify(engineeringServiceDetails));
  } catch (error: any) {
    throw new Error(error.message || "Failed to create service");
  }
};

export const updateEngineeringService = async (
  serviceId: string,
  serviceData: ServiceData
) => {
  await connect();

  try {
    const engineeringServiceDetails =
      await EngineeringService.findByIdAndUpdate(serviceId, serviceData, {
        new: true,
      });

    const updatedCategoryId = serviceData.category;
    let category = await EngineeringCategory.findById(updatedCategoryId);
    if (!category) {
      throw new Error("Category not found!");
    }

    if (!category.services.includes(serviceId)) {
      category.services.push(serviceId);
      await category.save();
    }

    return JSON.parse(JSON.stringify(engineeringServiceDetails));
  } catch (error: any) {
    throw new Error(error.message || "Failed to update service");
  }
};

export const deleteEngineeringService = async (serviceId: string) => {
  await connect();

  try {
    const service = await EngineeringService.findById(serviceId);
    if (!service) {
      throw new Error("Service not found!");
    }

    const categoryId = service.category;

    const category = await EngineeringCategory.findById(categoryId);
    if (!category) {
      throw new Error("Category not found!");
    }

    category.services = category.services.filter(
      (_id: string) => _id.toString() !== serviceId
    );

    await category.save();
    await EngineeringService.findByIdAndDelete(serviceId);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete service");
  }
};

export const deleteEngineeringServiceList = async ()=> {
  await connect();

  try {
    const services = await EngineeringService.find({});
    const categoryIds: Set<string> = new Set(
      services.map((service) => service.category.toString())
    );

    await EngineeringService.deleteMany({});

    for (const categoryId of categoryIds) {
      const category = await EngineeringCategory.findById(categoryId);
      if (category) {
        category.services = category.services.filter(
          (serviceId: string) =>
            !services.some(
              (service) => service._id.toString() === serviceId.toString()
            )
        );
        await category.save();
      }
    }

    return { message: "All services deleted and categories updated." };
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete services");
  }
};

