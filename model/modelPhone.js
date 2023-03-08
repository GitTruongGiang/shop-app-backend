const mongoose = require("mongoose");
const { Schema } = mongoose;

const modelPhoneSchema = new Schema(
  {
    authorPhone: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Phone",
    },
    model: { type: String, required: true, default: "" },
    latest_price: { type: String, require: false, default: "" },
    old_price: { type: String, require: false, default: "" },
    discount: { type: String, require: false, default: "" },
    ratings: { type: String, require: false, default: "" },
    os: { type: String, required: true, default: "" },
    memory_size: { type: String, required: true, default: "" },
    battery_size: { type: String, required: true, default: "" },
    screen_size: { type: String, required: true, default: "" },
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

const ModelPhone = mongoose.model("ModelPhone", modelPhoneSchema);
module.exports = ModelPhone;
