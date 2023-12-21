import ProductCategory from "../models/ProductCategory.js";
import asyncHandler from "express-async-handler";

export const createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.json({
    sucess: true,
    data: response ? response : "Created category failed",
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select("");
  return res.json({
    sucess: true,
    data: response ? response : [],
  });
});

export const getCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findById(pcid);
  return res.json({
    sucess: true,
    data: response ? response : [],
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  });
  return res.json({
    sucess: true,
    data: response ? response : "Updated category failed",
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(pcid);
  return res.json({
    sucess: true,
    data: response ? response : "Deleted category failed",
  });
});
