const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const Brand = require("../model/brand");
const Catego = require("../model/category");
const Product = require("../model/product");
const User = require("../model/user");

const productController = {};

// get all product
productController.getAllProduct = catchAsync(async (req, res, next) => {
  let { page, limit, ...fiterQuery } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  const offset = limit * (page - 1);
  const count = await Product.countDocuments({ status: "none" });
  const totalPage = Math.ceil(count / limit);

  let data = await Product.find({})
    .populate({ path: "authorCatego", model: Catego })
    .populate({ path: "authorBrand", model: Brand });

  data = await data
    .sort(() => {
      return Math.random() - 0.5;
    })
    .slice(offset, offset + limit);

  sendResponse(
    res,
    200,
    true,
    { data, totalPage },
    null,
    "Get List All Product"
  );
});
// get single product
productController.getSingleProduct = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const productId = req.params.productId;

  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(400, "User Not Exists", "Get Single Product Error");
  const product = await Product.findById(productId);
  if (!product)
    throw new AppError(400, "Product Not Exists", "Get Single Product Error");

  sendResponse(res, 200, true, product, null, "Get Single Product Success");
});

module.exports = productController;
