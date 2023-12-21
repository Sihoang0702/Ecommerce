import { apiGetProduct } from "apis/product";
import { apiUpdateCart } from "apis/user";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { formatMoney } from "utils/heplers";
import { getCurrentUser } from "store/auth/asyncAction";
import { Link, useNavigate } from "react-router-dom";
import { renderStartNumber } from "utils/heplers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import icons from "utils/icon";
import label from "../../assets/bestseller.png";
import path from "utils/path";
import React from "react";
import SelectOption from "./SelectOption";
import Swal from "sweetalert2";
import trending from "../../assets/trending.png";
import useHover from "hooks/useHover";
const ProductCard = (props) => {
  const { data, isNew, isShowNew = true } = props;
  const { AiFillEye, AiFillHeart } = icons;
  const { hovered, nodeRef } = useHover();
  const { current } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let productData;

  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === "CART") {
      if (!current) {
        return Swal.fire({
          title: "Almost",
          text: "Please login",
          icon: "info",
          showConfirmButton: "Go login page",
        });
      }

      try {
        const response = await apiGetProduct(data._id);
        if (response?.success) {
          productData = response?.data;
          const cart = await apiUpdateCart({
            pid: productData?._id,
            color: productData?.color,
            price: productData?.price,
          });
          if (cart?.success) {
            toast.success("Đã thêm vào giỏ hàng");
            dispatch(getCurrentUser());
          }
        }
      } catch (error) {
        toast.info(error);
        console.log("error:", error);
      }
    }
    if (flag === "WISH_LIST") console.log("Wish list");
    if (flag === "VIEW") console.log("Quick view");
  };

  return (
    <>
      <div className="w-full px-2 -mx-5 ">
        <div
          onClick={() => navigate(`/${data.category}/${data._id}/${data.slug}`)}
          className="text-base border p-4 flex flex-col items-center"
        >
          <div className="relative w-full" ref={nodeRef}>
            {hovered && (
              <div className="absolute bottom-0 flex items-center justify-center gap-4 slide-top w-full">
                <span onClick={(e) => handleClickOptions(e, "VIEW")}>
                  <SelectOption icon={<AiFillEye />}></SelectOption>
                </span>
                {current?.length > 0 &&
                current?.cart?.some((el) => el?.product === productData?._id) ? (
                  <span className="pointer-events-none cursor-not-allowed">
                    <SelectOption icon={<BsFillCartCheckFill color="green" />}></SelectOption>
                  </span>
                ) : (
                  <span onClick={(e) => handleClickOptions(e, "CART")}>
                    <SelectOption icon={<FaCartPlus />}></SelectOption>
                  </span>
                )}
                <span onClick={(e) => handleClickOptions(e, "WISH_LIST")}>
                  <SelectOption icon={<AiFillHeart />}></SelectOption>
                </span>
              </div>
            )}

            <img
              src={
                data?.thumbnail ||
                "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
              }
              className="max-w-[243px] h-[243px] object-cover mx-auto"
              alt="Product"
            />
            {isShowNew && (
              <img
                srcSet={isNew ? trending : label}
                className="absolute right-0 top-0 w-[70px] h-6"
                alt=""
              />
            )}
          </div>
          <div className="flex gap-2 flex-col gap-y-5 items-start w-full">
            <h1 className="line-clamp-1">{data?.title}</h1>
            <span className="flex h-4">{renderStartNumber(parseInt(data?.totalRatings))}</span>
            <span>{formatMoney(data?.price)} </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
