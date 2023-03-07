const mongoose = require("mongoose");
const { Schema } = mongoose;

const laptopSchema = new Schema(
  {
    brand: { type: String, required: true, default: "" }, //lenovo, apple, asus, dell, acer
    countlaptop: { type: Number, require: false, default: 0 },
    quantityRemaining: { type: Number, require: false, default: 0 },
  },
  { timestamps: true }
);

const Laptop = mongoose.model("Laptop", laptopSchema);

module.exports = Laptop;
