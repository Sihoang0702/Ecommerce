import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      //69 user
      //96 admin
      enum: [69, 96],
      default: 69,
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
        color: String,
        price: Number,
        thumbnail: String,
        title: String,
      },
    ],
    //liên kết bảng
    //mảng chứa id của address
    address: {
      type: String,
    },

    //mảng chứa id của Product
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    //người dùng bị ban
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    //quên mật khẩu
    passwordChangeAt: {
      type: String,
    },
    //khi người dùng quên mật khẩu cần 1 mã gửi qua email để xác nhận
    passwordResetToken: {
      type: String,
    },
    //thời gian hết hiệu lực token của password reset
    passwordResetExpires: {
      type: String,
    },
    registerToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//trước khi lưu vào db thực hiện những đoạn code "/* Mã hóa password */" :
userSchema.pre("save", async function (next /*pass*/) {
  if (!this.isModified()) next();
  //tạo 1 salt ngẫu nhiên với độ dài là 10
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//so sánh 2 password -> password = người dùng nhập vào , this.password = password trong db
userSchema.methods = {
  isCorrectPassword: async function (password) {
    // console.log("🚀 ~ password, this.password:", password, this.password);
    return await bcrypt.compare(password, this.password); //output : true of false
  },
  createPasswordChangeToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 1000; //+15 phút
    return resetToken;
  },
};
//Export the model
export default mongoose.model("User", userSchema);
