import React from "react";

const Productextrainfo = ({ icon, textMain, desc }) => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center gap-x-2 border p-2 w-full max-w-[260px]">
        <div className="w-[34px] h-[34px] bg-gray-700 flex items-center justify-center rounded-full">
          <span className="text-white text-xl">{icon}</span>
        </div>
        <div>
          <span className="text-gray-600 text-base">{textMain}</span>
          <p className="text-xs text-gray-400">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Productextrainfo;
