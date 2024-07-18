import React from "react";

type PageDescriptionProps = {
  children: React.ReactNode;
};

const PageDescription: React.FC<PageDescriptionProps> = ({ children }) => {
  return <p className="text-lg md:text-[1.43rem] leading-relaxed text-center">{children}</p>;
};

export default PageDescription;
