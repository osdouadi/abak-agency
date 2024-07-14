import Header from "@/components/dashboard/header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="pt-20 px-4 md:px-10 md:py-24">{children}</main>
    </>
  );
};

export default AdminLayout;
