import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../middleware/jwt.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";
import makeToken from "uniqid";
import { user } from "../../../data/user.js";
export const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, mobile } = req.body;
  if (!email || !password || !firstName || !lastName || !mobile) {
    return res.status(400).json({
      sucess: false,
      mes: "Vui lòng điền đầy đủ các trường",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Người dùng đã tồn tại");
  }
  const token = makeToken();
  res.cookie("dataRegister", { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000 });
  const html = `Click vào đây để hoàn tất đăng ký tài khoản.<a href=${process.env.URL_SERVER}/api/user/final-register/${token}>Click here</a> link sẽ hết hạn sau 15p`;
  await sendMail({
    email,
    html,
    subject: "Complete registration",
  });
  return res.json({
    mes: "Please check your email to active account",
  });
});

export const finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies?.dataRegister;
  const { token } = req.params;
  if (!cookie || cookie.token !== token) {
    res.clearCookie("dataRegister");
    return res.redirect(`${process.env.CLIENT_URL}/final-register/failed`);
  }
  const newUser = await User.create({
    email: cookie?.email,
    password: cookie?.password,
    mobile: cookie?.mobile,
    firstName: cookie?.firstName,
    lastName: cookie?.lastName,
  });
  res.clearCookie("dataRegister");
  if (newUser) {
    return res.redirect(`${process.env.CLIENT_URL}/final-register/success`);
  } else {
    return res.redirect(`${process.env.CLIENT_URL}/final-register/failed`);
  }
});
//refreshToken tạo 1 accessToken mới => accessToken xác thực user , phân quyền user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Đăng nhập thất bại",
    });
  }
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    //tách password và role
    const { password, role, refreshToken, ...userData } = response.toObject();
    //tạo accessToken
    const accessToken = generateAccessToken(response._id, role);
    //tạo refreshToken
    const newRefreshToken = generateRefreshToken(response._id);
    //lưu refreshToken vào cookie ,  maxAge : 7 * 24 * 60 * 60 * 1000 = 7d
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //lưu refreshToken vào db
    await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
    return res.status(200).json({
      success: true,
      mes: "Đăng nhập thành công",
      accessToken,
      userData,
    });
  } else {
    throw new Error("Đăng nhập thất bại tài khoản chưa được đăng ký");
  }
});
export const getOneUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id })
    .select("-refreshToken -password")
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "title thumbnail price dis",
      },
    });
  return res.status(200).json({
    success: user ? true : false,
    data: user ? user : "user not found",
  });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken) throw new Error("Không tìm thấy token ở cookie");
  // Check token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Token không khớp",
  });
});
//logut bến server
export const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) throw new Error("Bạn chưa đăng nhập");
  //xóa refresh token ở database
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  //xóa refesh token ở trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Đăng xuất thành công",
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      mes: "Vui lòng điên email",
    });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({
      mes: "Không tìm thấy user",
    });
  }
  const resetToken = user.createPasswordChangeToken();
  await user.save();
  const html = `Click vào đây để thay đổi mật khẩu . <a href=${process.env.CLIENT_URL}/rest-password/${resetToken}>Click me</a> link sẽ hết hạn sau 15p`;
  const data = {
    email,
    subject: "Forgot Password",
    html,
  };
  await sendMail(data);
  return res.status(200).json({
    success: true,
    mes: "Vui lòng kiểm tra email của bạn",
  });
});
export const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing imputs");
  const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.json({
      mes: "Cập nhật password thất bại",
    });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Updated password" : "Something went wrong",
  });
});
//crud
export const getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((field) => delete queries[field]);
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\bgte\b/g, "$gte");
  queryString = queryString.replace(/\bgt\b/g, "$gt");
  queryString = queryString.replace(/\blte\b/g, "$lte");
  queryString = queryString.replace(/\blt\b/g, "$lt");
  const formatedQueries = JSON.parse(queryString);
  if (queries?.name) formatedQueries.name = { $regex: queries.name, $options: "i" };
  if (req.query.q) {
    delete formatedQueries.q;
    formatedQueries["$or"] = [
      { lastName: { $regex: req.query.q, $options: "i" } },
      { fistName: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }
  let queryCommand = User.find(formatedQueries);
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  if (req.query.field) {
    const fields = req.query.field.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  const response = await queryCommand.exec();
  const counts = await User.countDocuments(formatedQueries);
  return res.status(200).json({
    counts,
    mes: response ? "All user" : "Not data",
    success: true,
    data: response ? response : [],
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid) throw new Error("Không tìm thấy id");
  const response = await User.findByIdAndDelete({ _id: uid });
  return res.status(200).json({
    mes: response ? true : false,
    user: response ? `Đã xóa người dùng ${response.email}` : "Không tìm thấy user",
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { firstName, lastName, email, mobile } = req.body;
  const data = { firstName, lastName, email, mobile };
  if (req.file) {
    data.avatar = req.file.path;
  }
  if (!_id || Object.keys(req.body).length === 0) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(_id, data, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updated: response ? response : "Update user failed",
  });
});

export const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    user: response ? response : "Update user failed",
  });
});

export const updateAddressUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    { new: true }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : fasle,
    user: response ? response : "Update user failed",
  });
});
export const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity = 1, color, price, thumbnail, title } = req.body;
  if (!pid) throw new Error("Missing input");
  const user = await User.findById(_id).select("cart");
  const alreadyCart = user?.cart?.find((el) => el.product?.toString() === pid);
  if (alreadyCart && alreadyCart.color === color) {
    const response = await User.updateOne(
      { cart: { $elemMatch: alreadyCart } },
      {
        $set: {
          "cart.$.quantity": quantity,
          "cart.$.price": price,
          "cart.$.thumbnail": thumbnail,
          "cart.$.title": title,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Updated your cart" : "Something went wrong",
    });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      {
        $push: { cart: { product: pid, quantity, color, price, thumbnail, title } },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Updated your cart" : "Something went wrong",
    });
  }
});
export const removeProductInCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, color } = req.params;
  const user = await User.findById(_id).select("cart");
  const alreadyCart = user?.cart?.find(
    (el) => el.product?.toString() === pid && el.color === color
  );
  if (!alreadyCart) {
    return res.status(200).json({
      success: true,
      mes: "Updated your cart",
    });
  }
  const response = await User.findByIdAndUpdate(
    _id,
    {
      $pull: { cart: { product: pid, color } },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Delete your cart" : "Something went wrong",
  });
});
export const createUsers = asyncHandler(async (req, res) => {
  const response = await User.create(user);
  return res.status(200).json({
    success: true,
    data: response ? response : "Create users failed",
  });
});
