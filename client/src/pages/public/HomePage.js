import React from "react";
import { Sidebar, Banner, BestSeller, DealDaily, FeaturedProducts, CustomSlider } from "components";

import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";

const HomePage = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);

  return (
    <>
      <div className="max-w-main w-full flex mt-6">
        <div className="flex-col w-[20%] gap-5 flex flex-auto">
          <Sidebar></Sidebar>
          <>
            <DealDaily></DealDaily>
          </>
        </div>
        <div className="flex-col gap-5 flex pl-5 w-[75%] ">
          <Banner></Banner>
          <BestSeller></BestSeller>
        </div>
      </div>
      <div className="my-8">
        <FeaturedProducts></FeaturedProducts>
      </div>
      <div>
        <h3 className="font-semibold py-3 text-xl uppercase border-b-2 border-colorMain mb-5">
          NEW ARRIVALS
        </h3>
        <div>
          <CustomSlider products={newProducts}></CustomSlider>
        </div>
        <div>
          <h3 className="font-semibold py-3 text-xl uppercase border-b-2 border-colorMain">
            HOT COLLECTIONS
          </h3>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {categories.length > 0 &&
              categories.map((el) => (
                <div className="w-full max-w-[385px] flex h-[210px] " key={el}>
                  <div className="border border-gray-200 flex flex-1 items-center justify-center gap-x-5">
                    <div className="my-auto">
                      <img className="w-[106px] object-cover" src={el.image} alt="" />
                    </div>
                    <div className="flex items-start flex-col h-full ">
                      <h4 className="font-semibold my-4 uppercase">{el?.title}</h4>
                      {el.brand?.map((b) => (
                        <div>
                          <p
                            key={b}
                            className="text-sm mb-1 flex items-center text-gray-400 hover:text-colorMain"
                          >
                            <IoIosArrowForward></IoIosArrowForward> {b}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <h3 className="font-semibold py-3 text-xl uppercase border-b-2 border-colorMain mb-5">
          Blog
        </h3>
      </div>
    </>
  );
};

export default HomePage;
