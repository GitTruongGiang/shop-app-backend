const mongoose = require("mongoose");
const { Schema } = mongoose;

const phoneSchema = new Schema(
  {
    brand: { type: String, required: true, default: "" },
    countphone: { type: Number, require: false, default: 0 },
    quantityRemaining: { type: Number, require: false, default: 0 },
  },
  { timestamps: true }
);
const Phone = mongoose.model("Phone", phoneSchema);
module.exports = Phone;
