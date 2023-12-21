import BlogCategory from "../models/BlogCategory.js";
import asyncHandler from "express-async-handler";

export const createCategoryBlog = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.json({
    status: true,
    created: response ? response : "Created category failed",
  });
});

export const getCategoriesBlog = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("title _id");
  return res.json({
    status: true,
    data: response ? response : [],
  });
});

export const getCategoryBlog = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findById(bcid);
  return res.json({
    status: true,
    data: response ? response : [],
  });
});

export const updateCategoryBlog = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.json({
    status: true,
    data: response ? response : "Updated category failed",
  });
});

export const deleteCategoryBlog = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndDelete(bcid);
  return res.json({
    status: true,
    data: response ? response : "Deleted category failed",
  });
});
