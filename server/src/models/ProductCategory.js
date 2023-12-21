import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    brand: {
      type: Array,
      require: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("ProductCategory", ProductCategorySchema);
