import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brand.js";
import { verifyAccessToken, isAdmin } from "../middleware/verifyToken.js";
const router = Router();

router.get("/", getBrands);
router.get("/:brandId", getBrand);
router.post("/", [verifyAccessToken, isAdmin], createBrand);
router.delete("/:brandId", [verifyAccessToken, isAdmin], deleteBrand);
router.put("/:brandId", [verifyAccessToken, isAdmin], updateBrand);

export default router;
