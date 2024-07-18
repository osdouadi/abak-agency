"use server";

import { connect } from "@/db/database-config";
import ServiceOrder from "@/models/service-order.model";
import { ServiceOrderData } from "@/types/service-order-data";

export const getServiceOrdersList = async () => {
  await connect();

  try {
    const serviceOrderList = await ServiceOrder.find({});
    return JSON.parse(JSON.stringify(serviceOrderList));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch categories list");
  }
};

export const getServiceOrderById = async (serviceOrderId: string) => {
  await connect();

  try {
    const serviceOrderById = await ServiceOrder.findById(serviceOrderId);

    return JSON.stringify(serviceOrderById);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch get category details");
  }
};

export const createServiceOrder = async (
  serviceOrderData: ServiceOrderData
) => {
  await connect();
  try {
    const serviceOrderDetails = await ServiceOrder.create({
      fullName: serviceOrderData.fullName,
      email: serviceOrderData.email,
      phoneNumber: serviceOrderData.phoneNumber,
      city: serviceOrderData.city,
      address: serviceOrderData.address,
      serviceId: serviceOrderData.serviceId,
      additionalNote: serviceOrderData.additionalNotes,
    });

    return JSON.parse(JSON.stringify(serviceOrderDetails));
  } catch (error: any) {
    throw new Error(error.message || "Failed to create category");
  }
};

export const deleteServiceOrder = async (serviceOrderId: string) => {
  await connect();

  try {
    return await ServiceOrder.findByIdAndDelete(serviceOrderId);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};

export const deleteServiceOrderList = async () => {
  await connect();

  try {
    return await ServiceOrder.deleteMany({});
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};
