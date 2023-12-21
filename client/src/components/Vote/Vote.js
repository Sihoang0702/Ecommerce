import React, { useEffect, useRef } from "react";
import icon from "utils/icon";

const Vote = ({ numberStar, ratings = 0, ratingTotal }) => {
  const { AiFillStar } = icon;
  const processRef = useRef();
  useEffect(() => {
    const percentage = ratingTotal !== 0 ? (ratings / ratingTotal) * 100 : 0;
    processRef.current.style.right = `${100 - percentage}%`;
  }, [ratings, ratingTotal]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 w-full">
      <div className="flex items-center gap-2 px-2">
        <span className="w-2">{numberStar}</span>
        <AiFillStar size={14} className="text-yellow-400" />
      </div>
      <div className="flex-1 h-[6px] rounded-md relative bg-gray-200 overflow-hidden">
        <div ref={processRef} className="absolute top-0 left-0 h-full bg-red-500"></div>
      </div>
      <div className="px-2">{`${ratings} review`}</div>
    </div>
  );
};

export default Vote;
