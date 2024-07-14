"use server";

import { currentUser } from "@clerk/nextjs";

export async function getActiveUserDetails() {
  try {
   const activeUser = await currentUser();

   return JSON.parse(JSON.stringify(activeUser));
  } catch (error) {
    console.log("error", error);
  }
}

