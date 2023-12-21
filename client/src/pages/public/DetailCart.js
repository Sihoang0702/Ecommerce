import { Breadcrumbs, Button, SelectQuantity } from "components";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "utils/heplers";
import { IoIosArrowRoundForward } from "react-icons/io";
const DetailCart = () => {
  const { current } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = useCallback(() => {
    if (quantity >= 10) return;
    setQuantity((prev) => +prev + 1);
  }, [quantity]);

  const handleDecrement = useCallback(() => {
    if (quantity < 1) return;
    setQuantity((prev) => +prev - 1);
  }, [quantity]);

  const handleQuantity = useCallback((number) => {
    if (!Number(number) || number < 1 || number > 10) {
      return;
    } else {
      setQuantity(+number);
    }
  }, []);
  const totalPrice = current?.cart?.reduce((sum, product) => sum + +product?.price, 0);
  return (
    <div className="">
      <div className="w-full bg-gray-200">
        <div className="flex flex-col p-3">
          <h1 className="font-medium text-lg uppercase mb-2">YOUR CART</h1>
          <Breadcrumbs></Breadcrumbs>
        </div>
      </div>
      <div className="font-bold grid my-8 border py-3 grid-cols-10 bg-bgMain text-white">
        <div className="col-span-6 w-full text-center">Products</div>
        <div className="col-span-1 w-full text-center">Quantity</div>
        <div className="col-span-3 w-full text-center">Price</div>
      </div>
      {current?.cart?.map((el) => (
        <div className="font-bold items-center grid my-8 border py-3 grid-cols-10">
          <div className="col-span-6 w-full text-center">
            <div className="flex flex-col gap-y-7">
              <div className="flex mb-4 gap-x-2 ">
                <img className="w-32 h-32" src={el?.product?.thumbnail} alt="" />
                <div className="flex w-full items-center px-2 text-start">
                  <div>
                    <h1 className="text-colorMain line-clamp-1">{el?.product?.title}</h1>
                    <div className="text-base flex flex-col">
                      <span className="text-sm">{el?.color}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 w-full text-center">
            <span className="text-center">
              <SelectQuantity
                increment={handleIncrement}
                decrement={handleDecrement}
                handleQuantity={handleQuantity}
                quantity={quantity}
              ></SelectQuantity>
            </span>
          </div>
          <div className="col-span-3 w-full text-center">
            <span className="font-semibold">{formatMoney(el?.price)}</span>
          </div>
        </div>
      ))}
      <div className="flex flex-col justify-end items-end">
        <div>
          <span className="text-sm text-gray-500">Subtotal : </span>
          <span className="font-bold text-xl">{formatMoney(totalPrice)}</span>
        </div>
        <p className="text-center italic text-sm font-normal text-gray-500 my-5">
          Shipping, taxes, and discounts calculated at checkout.
        </p>
        <Button className="max-w-[210px] rounded flex items-center justify-center">
          CHECK OUT <IoIosArrowRoundForward size={20} />
        </Button>
      </div>
    </div>
  );
};

export default DetailCart;
