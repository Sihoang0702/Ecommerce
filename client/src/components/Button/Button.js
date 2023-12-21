import React, { memo } from "react";

const Button = ({ children, onClick = () => {}, type = "button", className = "", ...props }) => {
  return (
    <>
      <button
        className={`${className} w-full bg-colorMain py-2 text-white hover:bg-gray-600 transition-all`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default memo(Button);
