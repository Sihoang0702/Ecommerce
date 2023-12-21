import React from "react";
import Slider from "react-slick";
import ProductCard from "../Product/ProductCard";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const CustomSlider = ({ products = [], activeTab, isShowNew }) => {
  return (
    <>
      {products && (
        <Slider className="custom-slide" {...settings}>
          {products &&
            products?.map((product) => (
              <div key={product._id}>
                <ProductCard
                  isShowNew={isShowNew}
                  isNew={activeTab === 1 ? true : false}
                  data={product}
                ></ProductCard>
              </div>
            ))}
        </Slider>
      )}
    </>
  );
};

export default CustomSlider;
