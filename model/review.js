const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({}, { timestamps: true });
const Review = mongoose.model("Rating", reviewSchema);
module.exports = Review;
