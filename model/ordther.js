const mongoose = require("mongoose");
const { Schema } = mongoose;

const ortherSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    ortherItems: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        totalAmount: { type: String, required: true },
        latestPrice: { type: String, required: true },
        oldPrice: { type: String, required: true },
        discount: { type: String, require: true },
        imageUrl: { type: String, required: true },
        quantity: { type: String, required: true },
        productId: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
      },
    ],
    total: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "confirm", "done"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Orther = mongoose.model("Orther", ortherSchema);
module.exports = Orther;
