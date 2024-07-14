import React from 'react'

type InputGroupProps = {
  children: React.ReactNode
};

const InputGroup: React.FC<InputGroupProps> = ({ children }) => {
  return (
    <div className="w-full flex items-center flex-col md:flex-row gap-5 md:gap-10 mb-5 md:pb-6">
      {children}
    </div>
  );
};

export default InputGroup