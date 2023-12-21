import { MemberSidebar } from "components";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import path from "utils/path";
const MemberLayout = () => {
  const { isAuthLogin, current } = useSelector((state) => state.auth);

  if (!isAuthLogin || !current) return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>;
  return (
    <div className="flex">
      <div className="w-[20%]">
        <MemberSidebar></MemberSidebar>
      </div>
      <div className="w-full flex-auto min-h-screen p-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MemberLayout;
