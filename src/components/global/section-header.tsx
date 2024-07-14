import React from "react";

type Props = {
  children: string;
};

const SectionHeader: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="text-2xl md:text-4xl pb-2">{children}</h2>
  );
};

export default SectionHeader;
