import mongoose from "mongoose";

const CounponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      uppercase: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    expiry: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Coupon", CounponSchema);
