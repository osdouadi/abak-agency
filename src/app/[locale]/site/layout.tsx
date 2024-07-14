import Navigation from "@/components/site/navigation";
import { getActiveUserDetails } from "@/app/actions/user.action";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const activeUser = await getActiveUserDetails();
  return (
    <main className="h-full">
      <Navigation user={activeUser} />
      {children}
    </main>
  );
};

export default layout;
