import React from "react";

const Input = ({
  name,
  control,
  placeholder = "",
  type = "text",
  labelName = "",
  error,
  defaultValue,
  register = () => {},
  ...props
}) => {
  return (
    <>
      <input
        type={type}
        className="px-1 placeholder:text-sm rounded-md w-full bg-gray-100 bg-opacity-50 outline-none h-[35px] my-auto"
        {...register(name)}
        placeholder={name}
        {...props}
      />
    </>
  );
};

export default Input;
