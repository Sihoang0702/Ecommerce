import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import slugify from "slugify";
import data from "../../../data/e-store.json" assert { type: "json" };
import ProductCategory from "../models/ProductCategory.js";
import categoryData from "../../../data/categoryBrand.js";

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name + Math.round(Math.random() * 1000)),
    desc: product?.desc,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    thumbnail: product?.thumbnail,
    totalRatings: 0,
  });
};
const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
    image: cate?.image,
  });
};
export const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  for (let cate of categoryData) promises.push(fn2(cate));
  await Promise.all(promises);
  return res.json({
    mes: "Push data successfully",
  });
});
export const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);
  return res.json({
    mes: "Push data successfully",
  });
});
