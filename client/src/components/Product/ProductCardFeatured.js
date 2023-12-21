import React from "react";
import { formatMoney, renderStartNumber } from "utils/heplers";

const ProductCardFeatured = ({ data }) => {
  return (
    <div className="w-[380px] h-[142px] flex border border-gray-200 px-10 py-1">
      <div className="my-auto">
        <img className="w-[85px] h-[85px] object-cover" src={data.thumbnail} alt="" />
      </div>
      <div className="flex flex-col justify-center flex-1 gap-1 text-sm">
        <p className="">{data.title}</p>
        <span className="flex">{renderStartNumber(data.totalRatings, 16)}</span>
        <p>{formatMoney(data?.price)} VND</p>
      </div>
    </div>
  );
};

export default ProductCardFeatured;
