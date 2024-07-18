"use server";

import { connect } from "@/db/database-config";
import ConsultingOrder from "@/models/consulting-order.model";
import { ConsultingOrderData } from "@/types/consulting-order-data";

export const getConsultingOrdersList = async () => {
  await connect();

  try {
    const consultingOrderList = await ConsultingOrder.find({});
    return JSON.parse(JSON.stringify(consultingOrderList));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch categories list");
  }
};

export const getConsultingOrderById = async (consultingOrderId: string) => {
  await connect();

  try {
    const consultingOrderById = await ConsultingOrder.findById(
      consultingOrderId
    );

    return JSON.stringify(consultingOrderById);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch get category details");
  }
};

export const createConsultingOrder = async (
  consultingOrderData: ConsultingOrderData
) => {
  await connect();
  try {
    const consultingOrderDetails = await ConsultingOrder.create({
      fullName: consultingOrderData.fullName,
      email: consultingOrderData.email,
      phoneNumber: consultingOrderData.phoneNumber,
      city: consultingOrderData.city,
      address: consultingOrderData.address,
      date: consultingOrderData.date,
    });

    return JSON.stringify(consultingOrderDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to create category");
  }
};

export const deleteConsultingOrder = async (consultingOrderId: string) => {
  await connect();

  try {
    return await ConsultingOrder.findByIdAndDelete(consultingOrderId);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};

export const deleteConsultingOrderList = async () => {
  await connect();

  try {
    return await ConsultingOrder.deleteMany({});
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};
