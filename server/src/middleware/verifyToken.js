import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
//verify token :  kiểm tra tính hợp lệ của token
export const verifyAccessToken = asyncHandler((req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          mes: "Token không hợp lệ",
        });
      // console.log(decode);
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Không tìm thấy token",
    });
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== 96)
    return res.status(401).json({
      success: false,
      mes: "Bạn không phải là admin",
    });
  next();
});
