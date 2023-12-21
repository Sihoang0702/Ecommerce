import Button from "components/Button/Button";
import React, { useCallback, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { isCloseModal } from "store/slice/globalSlice";
import { formatMoney } from "utils/heplers";
import { IoMdCloseCircle } from "react-icons/io";
import { apiDeleteCart } from "apis/user";
import { getCurrentUser } from "store/auth/asyncAction";
import { useNavigate } from "react-router-dom";
import path from "utils/path";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current } = useSelector((state) => state.auth);
  const closeModal = () => {
    dispatch(isCloseModal());
  };
  const removeCart = async (pId, cartId) => {
    try {
      await apiDeleteCart(pId, cartId);
      dispatch(getCurrentUser());
    } catch (error) {
      console.log("error:", error);
    }
  };
  const totalPrice = current?.cart?.reduce((sum, product) => sum + product.price, 0);

  return (
    <div onClick={(e) => e.stopPropagation()} className="relative">
      <div className="absolute w-[450px] h-screen bg-[#1c1d1d] text-white right-0 p-6 grid grid-rows-10">
        <header className=" h-full row-span-1">
          <div className="flex justify-between border-b p-4 mb-1">
            <h1 className="font-semibold text-xl">Your cart</h1>
            <button className="inline-block" onClick={closeModal}>
              <IoMdClose size={20}></IoMdClose>
            </button>
          </div>
        </header>
        <section className="row-span-6 h-full overflow-y-auto">
          {!current.cart && <span className="text-sx italic text-center">Your cart empty</span>}
          {current.cart &&
            current?.cart?.map((el) => {
              return (
                <div className="flex flex-col gap-y-7">
                  <div className="flex mb-4 gap-x-2 ">
                    <img className="w-20 h-20" src={el?.thumbnail} alt="" />
                    <div className="flex justify-between w-full items-center px-2">
                      <div>
                        <h1 className="text-colorMain line-clamp-1"> {el?.title}</h1>
                        <div className="text-sm flex flex-col">
                          <span className="font-semibold">{formatMoney(el?.price)}</span>
                          <span className="text-xs">color : {el?.color}</span>
                          <span className="text-xs">quantity : {el?.quantity}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeCart(el?.product?._id, el?.color)}
                        className="inline-block"
                      >
                        <IoMdCloseCircle />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </section>
        <div className="row-span-2 w-full border-t p-2">
          <div className="flex justify-between">
            <span>Subtotal : </span>
            <span className="font-bold">{formatMoney(totalPrice)}</span>
          </div>
          <p className="text-center italic text-sm font-normal text-gray-400 my-5">
            Shipping, taxes, and discounts calculated at checkout.
          </p>
          <Button onClick={() => navigate(`/${path.DETAIL_CART}`)} className="rounded">
            Shopping Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
