import { Router } from "express";
import {
  createNewBlog,
  deleteBlog,
  disLikeBlog,
  getBlog,
  getBlogs,
  likeBlog,
  updateBlog,
  uploadImageBlog,
} from "../controllers/blog.js";
import { verifyAccessToken, isAdmin } from "../middleware/verifyToken.js";
import uploadCloud from "../config/cloudinaryConfig.js";
const router = Router();

router.get("/", getBlogs);
router.get("/:bid", getBlog);
router.put("/likes/:bid", [verifyAccessToken], likeBlog);
router.put("/likes/:bid", [verifyAccessToken], likeBlog);
router.put("/upload-image/:bid",[verifyAccessToken, isAdmin],uploadCloud.single("image"),uploadImageBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], deleteBlog);
router.post("/", [verifyAccessToken, isAdmin], createNewBlog);
router.put("update/:bid", [verifyAccessToken, isAdmin], updateBlog);

export default router;
