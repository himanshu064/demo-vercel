import React from "react";

interface iForm {
  onSubmit?: () => void;
  children: React.ReactNode;
}

const Form: React.FC<iForm> = ({ onSubmit, children }) => {
  return (
    <form className="flex flex-col gap-4 my" noValidate onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
