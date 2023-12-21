import React from "react";

const SelectOption = (props) => {
  const { icon } = props;

  return (
    <div className="w-10 h-10 bg-white rounded-full border shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-600 hover:text-white transition-all ">
      {icon}{" "}
    </div>
  );
};

export default SelectOption;
