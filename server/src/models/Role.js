import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  code: {
    type: String,
    require: true,
    unique: true,
    index: true,
  },
  value: {
    type: String,
    require: true,
    unique: true,
  },
});
export default mongoose.model("Role", RoleSchema);
