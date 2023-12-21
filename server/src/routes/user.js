import { Router } from "express";
import {
  getOneUser,
  login,
  register,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateAddressUser,
  updateCart,
  finalRegister,
  createUsers,
  removeProductInCart,
} from "../controllers/user.js";
import { isAdmin, verifyAccessToken } from "../middleware/verifyToken.js";
import uploadCloud from "../config/cloudinaryConfig.js";
const router = Router();

router.post("/register", register);
router.post("/mock", createUsers);
router.get("/final-register/:token", finalRegister);
router.post("/login", login);
router.get("/current", verifyAccessToken, getOneUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
router.put("/current", [verifyAccessToken, uploadCloud.single("avatar")], updateUser);
router.put("/cart", [verifyAccessToken], updateCart);
router.delete("/remove-cart/:pid/:color", [verifyAccessToken], removeProductInCart);
router.put("/address/", [verifyAccessToken], updateAddressUser);
router.get("/", [verifyAccessToken, isAdmin], getUsers);
router.delete("/:uid", [verifyAccessToken, isAdmin], deleteUser);
router.put("/:uid", [verifyAccessToken, isAdmin], updateUserByAdmin);
export default router;

//CREATE (POST , PUSH) gửi req theo - body -> data được giấu đi không lộ trên trình duyệt
//GET + DELETE gửi theo kiểu query : ?abc
