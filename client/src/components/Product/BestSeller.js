import React, { useEffect, useState } from "react";
import { apiGetProducts } from "apis/product";
import banner1 from "../../assets/banner1-home2_2000x_crop_center.avif";
import banner2 from "../../assets/banner2-home2_2000x_crop_center.avif";

import { getProducts } from "store/products/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import CustomSlider from "../Slider/CustomSlider";
const tabs = [
  {
    id: 1,
    name: "BEST SELLER",
  },
  {
    id: 2,
    name: "NEW ARRIVALS",
  },
  {
    id: 3,
    name: "TABLET",
  },
];

const BestSeller = () => {
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const [bestSellers, setBestSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    async function fetchProducts() {
      const response = await apiGetProducts({ sort: "-sold" });
      setBestSellers(response.data);
      // setNewProducts(response?.data);
    }
    fetchProducts();
  }, []);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    if (activeTab === 1) {
      setProducts(bestSellers);
    } else {
      setProducts(newProducts);
    }
  }, [activeTab, bestSellers, newProducts]);
  return (
    <div className="w-full h-">
      <div className="flex text-lg gap-8 pb-4 border-b-2  border-colorMain">
        {tabs &&
          tabs?.map((tab) => (
            <span
              key={tab.id}
              className={`cursor-pointer pr-5 font-semibold capitalize border-r transition-all select-none ${
                activeTab === tab.id ? "text-black" : " text-gray-400"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </span>
          ))}
      </div>
      <div className="pt-4">
        <CustomSlider products={products} activeTab={activeTab}></CustomSlider>
      </div>
      <div className="grid grid-cols-2 gap-x-5 py-5 ">
        <img src={banner2} alt="" />
        <img src={banner1} alt="" />
      </div>
    </div>
  );
};

export default BestSeller;
