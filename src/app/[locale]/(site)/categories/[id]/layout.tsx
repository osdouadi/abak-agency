import React from "react";

type CategoryLayoutProps = {
  children: React.ReactNode;
};

const CategoryLayout: React.FC<CategoryLayoutProps> = ({ children }) => {
  return <div className="pt-[72px] pb-5">{children}</div>;
};

export default CategoryLayout;
