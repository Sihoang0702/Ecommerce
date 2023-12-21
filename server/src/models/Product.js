import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      // required: true,
      // unique: true,
      lowercase: true,
    },
    desc: {
      type: Array,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    //lien ket bang
    category: {
      type: String,
      ref: "Category",
    },
    //so luong
    quantity: {
      type: Number,
      default: 0,
    },
    //da ban
    sold: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
    },
    images: {
      type: Array,
    },
    //mau sac
    color: {
      type: String,
      //gia tri cho truoc
      // enum: ["black", "Grown", "Red"],
      require: true,
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        updatedAt: { type: Date },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
    variants: [
      {
        color: String,
        price: Number,
        thumbnail: String,
        images: Array,
        title: String,
        productId: String,
        sku: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.model("Product", productSchema);
