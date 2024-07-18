"use server";

import { connect } from "@/db/database-config";
import Contact from "@/models/contact.model";
import { ContactData } from "@/types/contact-data";

export const getContactList = async () => {
  await connect();

  try {
    const contactList = await Contact.find({});
    return JSON.parse(JSON.stringify(contactList));
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch categories list");
  }
};

export const getContactById = async (contactId: string) => {
  await connect();

  try {
    const contactById = await Contact.findById(
      contactId
    );

    return JSON.stringify(contactById);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch get category details");
  }
};

export const createContact = async (
  contactData: ContactData
) => {
  await connect();

  try {
    const contactDetails = await Contact.create({
      fullName: contactData.fullName,
      email: contactData.email,
      phoneNumber: contactData.phoneNumber,
      letterTitle: contactData.letterTitle,
      letterSubject: contactData.letterSubject,
    });

    return JSON.stringify(contactDetails);
  } catch (error: any) {
    throw new Error(error.message || "Failed to create category");
  }
};

export const deleteContact = async (contactById: string) => {
  await connect();

  try {
    return await Contact.findByIdAndDelete(contactById);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};

export const deleteContactList = async () => {
  await connect();

  try {
    return await Contact.deleteMany({});
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete category");
  }
};
