import Order from "../models/Order.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
import asyncHandler from "express-async-handler";

export const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  //đơn hàng người đặt
  const userCart = await User.findById(_id).select("cart").populate("cart.product", "title price");
  // console.log("userCart:", userCart);
  //tính tổng đơn hàng
  const product = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));

  let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
  const createData = { product, total, orderBy: _id };
  if (coupon) {
    const selectCounpon = await Coupon.findById();
    total =
      Math.round((total * (1 - parseInt(selectCounpon?.discount) / 100)) / 1000) * 1000 || total;
    createData.total = total;
    createData.coupon = coupon;
  }
  const response = await Order.create(createData);
  return res.json({
    status: true,
    data: response ? response : [],
  });
});

export const updateStatusOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  if (!orderId) throw new Error("Order not found");
  if (!status) throw new Error("Missing Input");
  const response = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!res.status) throw new Error("Missing input");
  return res.json({
    status: !!response,
    data: response ? response : "Update status order fail",
  });
});
export const getOrder = asyncHandler(async (req, res) => {
  const response = await Order.find({});
  return res.json({
    status: !!response,
    data: response ? response : "Get order fail",
  });
});
export const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order?.find({ orderBy: _id });
  return res.json({
    status: !!response,
    data: response ? response : "Get order fail",
  });
});
