import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import uniqid from "uniqid";

export const createProduct = asyncHandler(async (req, res) => {
  const { title, desc, price, category, color, brand } = req.body;
  const thumbnail = req?.files?.thumbnail[0]?.path;
  const images = req?.files?.images?.map((el) => el.path);
  if (!title || !desc || !price || !category || !color) throw new Error("Missing input");
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  if (thumbnail) req.body.thumbnail = thumbnail;
  if (images) req.body.images = images;
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    mes: newProduct ? "Created successfully" : "Failed to create",
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product?.findById(pid);
  return res.status(200).json({
    mes: product ? "Chi tiết sản phẩm" : "Không tìm thấy data",
    success: product ? true : false,
    data: product ? product : "Get product failed",
  });
});
//shorting , pagination , filter
export const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt trong req.query
  const excludeFields = ["limit", "sort", "page", "fields"];
  // Xóa các trường excludeFields khỏi query
  excludeFields.forEach((field) => delete queries[field]);
  // Format lại operators
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\bgte\b/g, "$gte");
  queryString = queryString.replace(/\bgt\b/g, "$gt");
  queryString = queryString.replace(/\blte\b/g, "$lte");
  queryString = queryString.replace(/\blt\b/g, "$lt");
  const formatedQueries = JSON.parse(queryString);
  // search
  let colorQueryObject = {};
  if (queries?.color) {
    delete formatedQueries.color;
    const colorArr = queries.color?.split(",");
    const colorQuery = colorArr.map((el) => ({ color: { $regex: el, $options: "i" } }));
    colorQueryObject = { $or: colorQuery };
  }
  let queryObject = {};
  if (queries?.q) {
    delete formatedQueries?.q;
    queryObject = {
      $or: [
        { title: { $regex: queries.q, $options: "i" } },
        { color: { $regex: queries.q, $options: "i" } },
        { category: { $regex: queries.q, $options: "i" } },
        { brand: { $regex: queries.q, $options: "i" } },
      ],
    };
  }
  const q = { ...colorQueryObject, ...formatedQueries, ...queryObject };
  let queryCommand = Product.find(q);

  // Sorting (-: giảm dần, +: tăng dần)
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Field limiting
  if (req.query.field) {
    const fields = req.query.field.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  /*
  Pagination
  - limit: số object lấy về 1 lần call api
  - skip: bỏ qua bao nhiêu?
  */
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Execute query
  // Số lượng sản phẩm thỏa mãn !== số lượng sản phẩm trả về 1 lần gọi API
  const response = await queryCommand.exec();
  const counts = await Product.countDocuments(q);
  return res.status(200).json({
    counts,
    mes: response ? "Tất cả sản phẩm" : "Không tìm thấy dữ liệu",
    success: true,
    data: response ? response : [],
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const files = req?.files;
  if (files?.thumbnail) req.body.thumbnail = files?.thumbnail[0]?.path;
  if (files?.images) req.body.images = req?.files?.images?.map((el) => el.path);
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  if (req.body.ratings) {
    delete req.body.ratings;
  }
  const productUpdated = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    mes: productUpdated ? "Update sản phẩm thành công" : "Không tìm thấy data",
    success: productUpdated ? true : false,
    data: productUpdated ? productUpdated : "Update product failed",
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    mes: product ? "Xóa sản phẩm thành công" : "Không tìm thấy data",
    success: product ? true : false,
    data: product ? product : "delete product failed",
  });
});

export const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid, updatedAt } = req.body;
  if (!star || !pid) throw new Error("Missing input");
  const ratingProduct = await Product.findById(pid);
  //người dùng đã đánh giá hay chưa?
  const alreadyRating = ratingProduct.ratings?.find((el) => el?.postedBy?.toString() === _id);
  if (alreadyRating) {
    //update lại star & comment
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
          "ratings.$.updatedAt": updatedAt,
        },
      },
      { new: true }
    );
  } else {
    //add star & comment
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id, updatedAt } },
      },
      { new: true }
    );
  }
  //sum ratings
  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct?.ratings?.length;
  const sumRatings = updatedProduct?.ratings?.reduce((sum, el) => sum + parseInt(el.star), 0);
  updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatedProduct.save();
  console.log(updatedProduct);
  return res.status(200).json({
    status: true,
    updatedProduct,
    mes: "Đánh giá thành công",
  });
});
export const uploadImageProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing Input");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    sucess: true,
    uploadImage: response ? response : "Upload Image fail",
  });
});

export const addVariants = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { title, price, color } = req.body;
  const thumbnail = req?.files?.thumbnail[0]?.path;
  const images = req?.files?.images?.map((el) => el.path);
  if (!title || !color || !price) throw new Error("Missing input");
  if (!req.files) throw new Error("Missing Input");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: {
        variants: {
          color,
          title,
          thumbnail,
          images,
          price,
          sku: uniqid().toLowerCase(),
          productId: pid,
        },
      },
    },
    { new: true }
  );
  return res.status(200).json({
    sucess: true,
    response: response ? response : "Add variants fail",
  });
});
export const getVariant = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  if (!product) {
    return res.status(404).json({
      success: false,
      mes: "Product not found",
    });
  }
  const variants = product.variants;
  return res.status(200).json({
    success: true,
    mes: "All variants retrieved successfully",
    data: variants,
  });
});

export const updateVariants = asyncHandler(async (req, res) => {
  const { pid, variantId } = req.params;
  const { title, price, color, oldThumbnail } = req.body;
  const thumbnail =
    req?.files?.thumbnail && req.files.thumbnail.length > 0
      ? req?.files?.thumbnail[0]?.path
      : oldThumbnail;
  const images = req?.files?.images?.map((el) => el.path);

  if (!title || !color || !price) {
    return res.status(400).json({
      success: false,
      mes: "Missing input or files",
    });
  }
  const response = await Product.findOneAndUpdate(
    {
      _id: pid,
      "variants._id": variantId,
    },
    {
      $set: {
        "variants.$.color": color,
        "variants.$.title": title,
        "variants.$.price": price,
        "variants.$.thumbnail": thumbnail,
        "variants.$.images": images,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    response: response ? response : "Update variants fail",
  });
});

export const deleteVariant = async (req, res) => {
  const { pid, variantId } = req.params;
  const product = await Product.findById(pid);
  if (!product) {
    return res.status(404).json({
      success: false,
      mes: "Product not found",
    });
  }
  const response = await Product.findOneAndUpdate(
    { _id: pid },
    { $pull: { variants: { _id: variantId } } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    data: response ? "Delete variants" : "Some thing went wrong",
  });
};
