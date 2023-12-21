import { Router } from "express";
import { isAdmin, verifyAccessToken } from "../middleware/verifyToken.js";
import {
  createCategoryBlog,
  deleteCategoryBlog,
  getCategoriesBlog,
  getCategoryBlog,
  updateCategoryBlog,
} from "../controllers/blogCategory.js";

const router = Router();

router.get("/", getCategoriesBlog);
router.get("/:bcid", getCategoryBlog);
router.put("/:bcid", [verifyAccessToken, isAdmin], updateCategoryBlog);
router.delete("/:bcid", [verifyAccessToken, isAdmin], deleteCategoryBlog);
router.post("/", [verifyAccessToken, isAdmin], createCategoryBlog);

export default router;
