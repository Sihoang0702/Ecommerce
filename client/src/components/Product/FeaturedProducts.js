import React from "react";
import { useState, useEffect } from "react";
import ProductCardFeatured from "./ProductCardFeatured";
import { apiGetProducts } from "apis/product";
const FeaturedProducts = () => {
  const [featureds, setFeatured] = useState([]);
  useEffect(() => {
    async function fetchFeaturedProducts() {
      const response = await apiGetProducts({
        limit: 9,
        totalRatings: 5,
      });
      if (response?.success) {
        setFeatured(response?.data);
      }
    }
    fetchFeaturedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h3 className="font-semibold py-3 text-xl uppercase border-b-2 border-colorMain">
        Featured Products
      </h3>
      <div className="grid grid-cols-3 w-full gap-6 my-3 ">
        {featureds.length > 0 &&
          featureds.map((featured) => (
            <ProductCardFeatured key={featured._id} data={featured}></ProductCardFeatured>
          ))}
      </div>
      <div className="w-full flex h-full max-h-[650px] gap-x-5 items-center justify-center">
        <div className="h-full">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-y-5 w-[280px] h-full">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          />
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          />
        </div>
        <div className="w-[280px] h-full">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
