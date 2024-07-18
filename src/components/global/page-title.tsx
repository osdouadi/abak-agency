import React from "react";

type PageTitleProps = {
  children: React.ReactNode;
};

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <h2 className="font-medium text-center text-2xl md:text-3xl leading-relaxed text-primary opacity-90 pb-1.5 md:pb-2.5">
      {children}
    </h2>
  );
};

export default PageTitle;
