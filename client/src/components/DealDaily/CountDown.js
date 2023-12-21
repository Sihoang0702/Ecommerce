import { memo } from "react";
import React from "react";

const CountDown = (props) => {
  const { unit = "", number = 0 } = props;
  return (
    <div className="w-[30%] h-14 flex items-center justify-center bg-gray-100 rounded flex-col">
      <span className="text-lg font-semibold">{number}</span>
      <p className="text-xs text-[#8b8b8b]">{unit}</p>
    </div>
  );
};

export default memo(CountDown);
