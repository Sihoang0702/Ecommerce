import "./index.scss";
import {
  AuthPage,
  PublicPage,
  HomePage,
  BlogPage,
  ServicePage,
  ProductPage,
  DetailProductPage,
  FinalRegister,
  ResetPassword,
  DetailCart,
} from "./pages/public";
import {
  AdminLayout,
  ManageOrder,
  ManageProduct,
  ManageUser,
  Dashboard,
  CreateProduct,
} from "pages/admin";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import path from "./utils/path";
import React from "react";
import { getCategory } from "./store/app/appAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HistoryPage, MemberLayout, MyCartPage, Personal, WishListPage } from "pages/member";
import ProductByCategory from "pages/public/ProductByCategoryPage";
import Modal from "react-modal";
import { Cart } from "components";
import { isCloseModal } from "store/slice/globalSlice";
import ManageVariant from "pages/admin/ManageVariant";

function App() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <>
      <div onClick={() => dispatch(isCloseModal())}>
        <Modal
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 "
          className={"bg-none border-none outline-none select-none"}
          isOpen={isOpen}
        >
          <Cart></Cart>
        </Modal>
      </div>
      <Routes>
        <Route path={path.PUBLIC} element={<PublicPage />}>
          <Route path={path.HOME} element={<HomePage />} />
          <Route path={path.BLOGS} element={<BlogPage />} />
          <Route path={path.OUR_SERVERS} element={<ServicePage />} />
          <Route path={path.PRODUCTS} element={<ProductPage />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__SLUG} element={<DetailProductPage />} />
          <Route path={path.PRODUCTS__CATEGORY} element={<ProductByCategory />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />
          <Route path="*" element={<h1 className="text-center my-10">404 | NOT FOUND</h1>} />
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={"/admin/manage-variant/:pid/:title"} element={<ManageVariant />} />
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<MyCartPage />} />
          <Route path={path.WISHLIST} element={<WishListPage />} />
          <Route path={path.HISTORY} element={<HistoryPage />} />
        </Route>

        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<AuthPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
