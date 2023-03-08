const mongoose = require("mongoose");
const { Schema } = mongoose;

const modelLaptopSchema = new Schema(
  {
    authorLaptop: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Laptop",
    },
    model: { type: String, required: true, default: "" },
    latest_price: { type: String, require: false, default: "" },
    old_price: { type: String, require: false, default: "" },
    discount: { type: String, require: false, default: "" },
    ratings: { type: String, require: false, default: "" },
    weight: { type: String, require: false, default: "" },
    os: { type: String, required: true, default: "" },
    os_bit: { type: String, require: false, default: "" },
    ssd: { type: String, require: false, default: "" },
    ram_gb: { type: String, require: false, default: "" },
    ram_type: { type: String, require: false, default: "" },
    processor_brand: { type: String, require: false, default: "" },
    processor_name: { type: String, require: false, default: "" },
    processor_gnrtn: { type: String, require: false, default: "" },
    imageUrl: { type: String, require: false, default: "" },
    status: {
      type: String,
      required: true,
      enum: ["none", "pedding", "success"],
      default: "none",
    },
  },
  { timestamps: true }
);

const ModelLaptop = mongoose.model("ModelLaptop", modelLaptopSchema);

module.exports = ModelLaptop;
