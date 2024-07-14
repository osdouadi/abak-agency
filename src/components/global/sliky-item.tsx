import React from "react";

type Props = {
  children: React.ReactNode;
};

const SlikyItem: React.FC<Props> = ({ children }) => {
  return <div className="h-[10rem] md:h-[15rem] mx-1">{children}</div>;
};

export default SlikyItem;
