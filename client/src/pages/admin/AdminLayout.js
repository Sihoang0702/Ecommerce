import { SidebarAdmin } from "components";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import path from "utils/path";
const AdminLayout = () => {
  const { isAuthLogin, current } = useSelector((state) => state.auth);
  if (!isAuthLogin || !current || +current.role !== 96) {
    return <Navigate to={`/${path.HOME}`} replace={true}></Navigate>;
  }
  return (
    <div className=" w-full max-h-screen grid grid-cols-10">
      <div className="col-span-2">
        <SidebarAdmin></SidebarAdmin>
      </div>
      <div className="col-span-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminLayout;
