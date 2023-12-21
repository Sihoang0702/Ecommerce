import { Router } from "express";
import { isAdmin, verifyAccessToken } from "../middleware/verifyToken.js";
import {
  createOrder,
  getOrder,
  getUserOrder,
  updateStatusOrder,
} from "../controllers/order.js";

const router = Router();
router.post("/", [verifyAccessToken], createOrder);
router.get("/", [verifyAccessToken], getUserOrder);
router.get("/admin", [verifyAccessToken, isAdmin], getOrder);
router.put("/status/:orderId", [verifyAccessToken, isAdmin], updateStatusOrder);

export default router;
