import mongoose from "mongoose";
//lưu thông tin mua hàng
const orderSchema = new mongoose.Schema({
  product: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: Number,
      color: String,
    },
  ],
  status: {
    type: String,
    default: "Processing",
    enum: ["Cancelled", "Processing", "Successed"],
    //thanh toán onlien tham khảo : thư viện stripe
  },
  total: Number,
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: "Coupon",
  },
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
export default mongoose.model("Order", orderSchema);
