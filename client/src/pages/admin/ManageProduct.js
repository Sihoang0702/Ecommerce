import { apiDeleteProduct, apiGetProducts } from "apis/product";
import { Button, CustomizeVariants, InputField, Pagination } from "components";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { formatMoney } from "utils/heplers";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useLocation, useNavigate, Link } from "react-router-dom";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import UpdateProduct from "./UpdateProduct";
import { IoIosColorFill } from "react-icons/io";
const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [customizeVariants, setCustomizeVariants] = useState(null);
  console.log("customizeVariants:", customizeVariants);
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { watch, control } = useForm({
    q: "",
  });
  const watchQuery = watch("q");
  const reRender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    async function fetchProducts(params) {
      try {
        if (watchQuery) {
          const response = await apiGetProducts({ ...params, q: watchQuery });
          // navigate({
          //   pathname: location.pathname,
          //   search: createSearchParams({ q: watchQuery }).toString(),
          // });
          if (response.success) {
            setProducts(response?.data);
            setTotalProduct(response?.counts);
          }
          //trở lại page 1 khi search
        } else {
          const response = await apiGetProducts(params);
          // navigate({
          //   pathname: location.pathname,
          // });
          if (response.success) {
            setProducts(response?.data);
            setTotalProduct(response?.counts);
          }
        }
      } catch (error) {
        console.log("error:", error);
      }
    }
    fetchProducts({ ...queries });
  }, [location.pathname, navigate, params, watchQuery, update]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [params]);
  const onHandleRemoveProduct = async (pid) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm("Are you sure you want to remove")) return;
      const response = await apiDeleteProduct(pid);
      if (response.success) {
        toast.success("Delete product successfully");
        reRender();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <div className=" relative">
      {editProduct && (
        <div className="absolute inset-0 bg-white min-h-screen">
          <UpdateProduct editProduct={editProduct} reRender={() => reRender}></UpdateProduct>
        </div>
      )}
      {customizeVariants && (
        <div className="absolute inset-0 bg-white min-h-screen">
          <CustomizeVariants
            customizeVariants={customizeVariants}
            setCustomizeVariants={setCustomizeVariants}
          ></CustomizeVariants>
        </div>
      )}
      <div className="w-full bg-white">
        <div className="flex items-center justify-between h-[75px] font-semibold ">
          <h1 className="text-3xl">Manage Product</h1>
          {editProduct && (
            <Button className="max-w-[120px] rounded z-50" onClick={() => setEditProduct(null)}>
              Cannel
            </Button>
          )}
        </div>
        <InputField
          placeholder="Search product by title"
          name={"q"}
          control={control}
          className="px-4 py-3 my-2 placeholder:text-sm rounded-md w-full bg-gray-100 bg-opacity-50 outline-none "
        ></InputField>
      </div>

      <table className="table-auto text-left w-full min-h-[50px]">
        <thead className="font-bold bg-gray-700 text-white text-sm border border-white ">
          <tr>
            <th className="px-3 py-2">#</th>
            <th className="px-3 py-2">Thumbnail</th>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Brand</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">Price</th>
            <th className="px-3 py-2">Quantity</th>
            <th className="px-3 py-2">Sold</th>
            <th className="px-3 py-2">Color</th>
            <th className="px-3 py-2">Variants</th>
            {/* <th className="px-3 py-2">Variants</th> */}
            <th className="px-3 py-2">CreatedAt</th>
            <th className="px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {products?.map((product, index) => (
            <tr className="border border-gray-500" key={product?._id}>
              <td className="px-2">{index + 1}</td>
              <td className="p-2">
                <img src={product?.thumbnail} className="w-20 h-20 my-auto object-cover" alt="" />
              </td>
              <td className="py-2 px-4">{product?.title}</td>
              <td className="py-2 px-2">{product?.brand}</td>
              <td className="py-2 px-4">{product?.category}</td>
              <td className="py-2 px-4">{formatMoney(product?.price)}</td>
              <td className="py-2 px-4">{product?.quantity}</td>
              <td className="py-2 px-4">{product?.sold}</td>
              <td className="py-2 px-4">{product?.color}</td>
              <td className="py-2 px-4 text-center">{product?.variants.length || 0}</td>

              <td className="py-2 px-4 text-center">
                {dayjs(product?.createdAt).format("DD/MM/YYYY")}
              </td>
              <td>
                <div className="flex items-center justify-center gap-3 text-base mr-1 text-blue-500">
                  <button onClick={() => setEditProduct(product)}>
                    <FaPencilAlt size={16}></FaPencilAlt>
                  </button>
                  <button onClick={() => onHandleRemoveProduct(product._id)}>
                    <FaTrashAlt size={16}></FaTrashAlt>
                  </button>
                  <button onClick={() => setCustomizeVariants(product)}>
                    <IoIosColorFill size={16}></IoIosColorFill>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-5 flex justify-center">
        <Pagination totalProduct={totalProduct}></Pagination>
      </div>
    </div>
  );
};

export default ManageProduct;
