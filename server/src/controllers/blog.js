import asyncHandler from "express-async-handler";
import Blog from "../models/Blog.js";

export const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find({});
  return res.json({
    sucess: true,
    data: response ? response : [],
  });
});

export const createNewBlog = asyncHandler(async (req, res) => {
  const { title, desc, category } = req.body;
  if (!title || !desc || !category) throw new Error("Missing input");
  const response = await Blog.create(req.body);
  return res.json({
    sucess: true,
    data: response ? response : "Create blog failed",
  });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) throw new Error("Missing input");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.json({
    sucess: true,
    data: response ? response : "Update blog failed",
  });
});

/*
Khi người dùng like 1 blog thì : 
1.Check xem người trước đó có dislike hay không ? Có -> click -> bỏ dislike
2.Check xem người đó trước đó có like hay không ? Có -> click -> bỏ like / thêm like
*/
export const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log("_id:", _id);
  const { bid } = req.params;
  if (!bid) throw new Error("Missing Input");
  const blog = await Blog.findById(bid);
  // Kiểm tra xem có dislike không
  const alreadyDislike = blog?.disLikes?.find((el) => el.toString() === _id);
  if (alreadyDislike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
  const isLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: _id },
      },
      { new: true }
    );
    return res.json({
      status: true,
      data: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $push: { likes: _id },
      },
      { new: true }
    );
    return res.json({
      status: true,
      data: response,
    });
  }
});

export const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing Input");
  const blog = await Blog.findById(bid);
  // Kiểm tra xem có dislike không
  const alreadyDislike = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyDislike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      data: response,
    });
  }
  const isDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { disLikes: _id },
      },
      { new: true }
    );
    return res.json({
      sucess: true,
      data: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $push: { disLikes: _id },
      },
      { new: true }
    );
    return res.json({
      sucess: true,
      data: response,
    });
  }
});
export const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("likes", "firstName lastName")
    .populate("disLikes", "firstName firstName");
  return res.json({
    status: true,
    data: blog ? blog : "Không tìm thấy blog",
  });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndDelete(bid);
  return res.json({
    sucess: true,
    data: blog ? blog : "Delete failed",
  });
});
export const uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("Missing Input");
  const response = await Blog.findByIdAndUpdate(bid, {image : req.file.path}, { new: true });
  return res.status(200).json({
    sucess: true,
    uploadImage: response ? response : "Upload Image fail",
  });
});
