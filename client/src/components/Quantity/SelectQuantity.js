import React, { memo } from "react";

const SelectQuantity = memo(
  ({ quantity, handleQuantity, increment = () => {}, decrement = () => {} }) => {
    return (
      <div className="flex items-center w-full max-w-[100px] h-[33px]">
        <span
          className="text-xl p-2 border-r border-gray-400 select-none cursor-pointer"
          onClick={decrement}
        >
          -
        </span>
        <input
          className="input-form text-center w-[50px]"
          type="text"
          value={quantity}
          onChange={(e) => handleQuantity(e.target.value)}
        />
        <span
          className="text-xl p-2 border-l border-gray-400 select-none cursor-pointer"
          onClick={increment}
        >
          +
        </span>
      </div>
    );
  }
);

export default SelectQuantity;
