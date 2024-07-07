import React from "react";

type Props = {
  children: string;
};

const SectionSubheader: React.FC<Props> = ({ children }) => {
  return <p className="text-xl text-muted-foreground pb-4">{children}</p>;
};

export default SectionSubheader;
