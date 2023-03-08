const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema(
  {
    brand: { type: String, required: true, default: "" }, //lenovo, apple, asus, dell, acer //Samsung, Apple, Xiaomi, HUAWEI, Sony
    count: { type: Number, require: false, default: 0 },
    countphone: { type: Number, require: false, default: 0 },
    quantityRemaining: { type: Number, require: false, default: 0 },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
