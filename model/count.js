const mongoose = require("mongoose");
const { Schema } = mongoose;

const countSchema = new Schema(
  {
    authorBrand: { type: Schema.Types.ObjectId, required: true, ref: "Brand" },
    catego: {
      type: String,
      require: false,
      enum: ["laptop", "phone"],
      default: "laptop",
    },
    count: { type: Number, require: false, default: 0 },
    quantityRemaining: { type: Number, require: false, default: 0 },
  },
  { timestamps: true }
);

const Count = mongoose.model("Count", countSchema);
module.exports = Count;
