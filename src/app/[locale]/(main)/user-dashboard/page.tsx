import { auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {

const {sessionClaims} = auth()
console.log("sessionClaims", sessionClaims?.metadata.role);
  return <div>dashboard</div>;
};

export default page;
