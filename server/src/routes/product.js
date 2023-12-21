import { Router } from "express";
import { isAdmin, verifyAccessToken } from "../middleware/verifyToken.js";
import {
  addVariants,
  createProduct,
  deleteProduct,
  deleteVariant,
  getProduct,
  getProducts,
  getVariant,
  ratings,
  updateProduct,
  updateVariants,
  uploadImageProduct,
} from "../controllers/product.js";
import uploadCloud from "../config/cloudinaryConfig.js";
const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProduct);
router.put("/ratings", verifyAccessToken, ratings);
router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createProduct
);
router.put(
  "/variants/:pid",
  [
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
      { name: "images", maxCount: 10 },
      { name: "thumbnail", maxCount: 1 },
    ]),
  ],
  addVariants
);
router.get("/get-variants/:pid", [verifyAccessToken, isAdmin], getVariant);
router.put(
  "/update-variants/:pid/:variantId",
  [
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
      { name: "images", maxCount: 10 },
      { name: "thumbnail", maxCount: 1 },
    ]),
  ],
  updateVariants
);
router.delete("/variants/:pid/:variantId", [verifyAccessToken, isAdmin], deleteVariant);
router.put(
  "/upload-image/:pid",
  [verifyAccessToken, isAdmin],
  uploadCloud.array("images", 10),
  uploadImageProduct
);

router.put(
  "/:pid",
  [
    verifyAccessToken,
    isAdmin,
    uploadCloud.fields([
      { name: "images", maxCount: 10 },
      { name: "thumbnail", maxCount: 1 },
    ]),
  ],
  updateProduct
);

router.delete("/:pid", [verifyAccessToken, isAdmin], deleteProduct);

export default router;
