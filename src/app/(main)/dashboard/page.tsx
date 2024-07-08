import { getUserDetails } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const authUser = await currentUser();
  console.log("authUser", authUser);
  if (!authUser) return redirect("/sign-in");

  const user = await getUserDetails();

  return <div>dashboard</div>;
};

export default page;
