import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";

export const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    sucess: true,
    created: response ? response : "Created Brand failed",
  });
});

export const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find().select("title _id");
  return res.json({
    sucess: true,
    data: response ? response : [],
  });
});

export const getBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const response = await Brand.findById(brandId);
  return res.json({
    sucess: true,
    data: response ? response : [],
  });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const response = await Brand.findByIdAndUpdate(brandId, req.body, {
    new: true,
  });
  return res.json({
    sucess: true,
    data: response ? response : "Updated Brand failed",
  });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const response = await Brand.findByIdAndDelete(brandId);
  return res.json({
    sucess: true,
    data: response ? response : "Deleted Brand failed",
  });
});
