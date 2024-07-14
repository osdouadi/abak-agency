import React from "react";

type Props = {
  children: React.ReactNode;
};

const HeaderContainer = ({ children }) => {
  return (
    <div className="fixed top-0 right-0 left-0 py-2.5 px-4 flex items-center justify-between z-40 bg-card">
      {children}
    </div>
  );
};

export default HeaderContainer;
