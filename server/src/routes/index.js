import userRouter from "./user.js";
import productRouter from "./product.js";
import productCategoryRouter from "./productCategory.js";
import blogRouter from "./blog.js";
import blogCategoryRouter from "./blogCategory.js";
import brandRouter from "./brand.js";
import couponRouter from "./coupon.js";
import orderRouter from "./order.js";
import routerInsertData from "./insert.js";
import { errorHandler, notFound } from "../middleware/errorHandler.js";

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/product-category", productCategoryRouter);
  app.use("/api/blog-category", blogCategoryRouter);
  app.use("/api/insert", routerInsertData);
  //[error]
  app.use(notFound);
  app.use(errorHandler);
};

export default initRoutes;
