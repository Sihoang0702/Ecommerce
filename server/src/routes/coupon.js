import { Router } from "express";
import { verifyAccessToken, isAdmin } from "../middleware/verifyToken.js";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  updateCoupon,
} from "../controllers/coupon.js";
const router = Router();

router.get("/", [verifyAccessToken, isAdmin], getCoupons);
router.put("/:couponId", [verifyAccessToken, isAdmin], updateCoupon);
router.post("/", [verifyAccessToken, isAdmin], createCoupon);
router.delete("/:couponId", [verifyAccessToken, isAdmin], deleteCoupon);
export default router;
