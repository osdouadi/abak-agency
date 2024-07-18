import React from "react";

type Props = {
  children: string;
};

const SectionHeader: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="text-xl md:text-3xl pb-1">{children}</h2>
  );
};

export default SectionHeader;
