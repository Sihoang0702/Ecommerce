import Coupon from "../models/Coupon.js";
import asyncHandler from "express-async-handler";

export const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing Input");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + parseInt(expiry * 24 * 60 * 60 * 1000),
  });
  return res.json({
    sucess: true,
    created: response ? response : "Created Counpon failed",
  });
});

export const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-updatedAt -createdAt");
  return res.json({
    sucess: true,
    data: response ? response : [],
  });
});

export const getCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const response = await Coupon.findById(couponId);
  return res.json({
    sucess: true,
    data: response ? response : [],
  });
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing Input");
  if (req.body.expiry)
    req.body.expiry =
      Date.now() + parseInt(req.body.expiry * 24 * 60 * 60 * 1000);

  const response = await Coupon.findByIdAndUpdate(couponId, req.body, {
    new: true,
  });
  return res.json({
    sucess: true,
    data: response ? response : "Updated Counpon failed",
  });
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const response = await Coupon.findByIdAndDelete(couponId);
  return res.json({
    sucess: true,
    data: response ? response : "Deleted Counpon failed",
  });
});
