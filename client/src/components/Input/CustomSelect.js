import React from "react";

const CustomSelect = ({
  option = [],
  register = () => {},
  name = "",
  className = "",
  labelName,
  choose = false,
  defaultValue = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full`}>
      {labelName && <label htmlFor={name}>{labelName}</label>}
      <select
        className={`px-2 placeholder:text-sm rounded-md bg-gray-100 bg-opacity-50  outline-none h-[35px] my-auto ${className} }`}
        id={name}
        {...register(name)}
      >
        {choose && (
          <option className="text-center" value={""}>
            -Choose-
          </option>
        )}
        {option?.map((el) => (
          <option value={el.code}>{el.value}</option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
