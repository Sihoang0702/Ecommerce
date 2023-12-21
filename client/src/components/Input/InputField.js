import React from "react";
import { useController } from "react-hook-form";
const InputField = ({
  name,
  control,
  placeholder = "",
  type = "text",
  labelName = "",
  className = "",
  error,

  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="flex flex-col gap-3 w-full mb-6">
      {labelName && <label htmlFor="">{labelName}</label>}
      <input
        type={type}
        className={`px-4 py-4 placeholder:text-sm rounded-md w-full bg-gray-100 bg-opacity-50 outline-none ${className}`}
        placeholder={placeholder}
        name={name}
        id={name}
        {...field}
        {...props}
      />
      {error && <p className="text-colorMain text-sm my-1">{error}</p>}
    </div>
  );
};

export default InputField;
