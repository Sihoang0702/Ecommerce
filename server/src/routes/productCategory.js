import { Router } from "express";
import { isAdmin, verifyAccessToken } from "../middleware/verifyToken.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/productCategory.js";

const router = Router();

router.get("/", getCategories);
router.get("/:pcid", getCategory);
router.put("/:pcid", [verifyAccessToken, isAdmin], updateCategory);
router.delete("/:pcid", [verifyAccessToken, isAdmin], deleteCategory);
router.post("/", [verifyAccessToken, isAdmin], createCategory);

export default router;
