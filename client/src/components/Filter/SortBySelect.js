import React, { memo } from "react";

const SortBySelect = ({ value, changeValue, option }) => {
  return (
    <select
      className="form-select text-sm"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="">Choose</option>
      {option?.map((el) => (
        <option key={el.id} value={el.value}>
          {el.text}
        </option>
      ))}
    </select>
  );
};

export default memo(SortBySelect);
