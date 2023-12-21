import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, TopHeader } from "components";
import Footer from "components/Layout/Footer";
const PublicPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader></TopHeader>
      <Header></Header>
      <Navigation></Navigation>
      <div className="w-full max-w-main ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PublicPage;
