"use server";

import { connect } from "@/db/database-config";
import EngineeringService from "@/models/engineering-service.model";
import { ServiceData } from "@/types/service-data";

export const getEngineeringServiceList = async () => {
  await connect();

  try {
    const engineeringServiceList = await EngineeringService.find({}).populate({
      path: "category",
      select: "title",
    });
    return JSON.stringify(engineeringServiceList);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch service list");
  }
};

export const getEngineeringServiceById = async (serviceId: string) => {
  await connect();

  try {
    const engineeringServiceById = await EngineeringService.findById(serviceId);

    return JSON.stringify(engineeringServiceById);
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
    return JSON.stringify(engineeringServiceDetails);
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
    return JSON.stringify(engineeringServiceDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to update service");
  }
};

export const deleteEngineeringService = async (serviceId: string) => {
  await connect();

  try {
    const engineeringServiceDetails =
      await EngineeringService.findByIdAndDelete(serviceId);
    return JSON.stringify(engineeringServiceDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete service");
  }
};

export const deleteEngineeringServiceList = async () => {
  await connect();

  try {
    return await EngineeringService.deleteMany({});
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete service");
  }
};

