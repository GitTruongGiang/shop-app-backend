const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const Brand = require("../model/brand");
const Catego = require("../model/category");
const Product = require("../model/product");
const User = require("../model/user");

const productController = {};

// get all product
productController.getAllProduct = catchAsync(async (req, res, next) => {
  let { page, limit, ...filterQuery } = req.query;
  const allowfilter = ["search", "type"];
  const types = ["latest_price"];

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  let filterkey = Object.keys(filterQuery);
  filterkey.forEach((key) => {
    if (!allowfilter.includes(key)) {
      throw new AppError(401, `Query ${key} is not allowed`, "Search Error");
    }
    if (!filterQuery[key]) delete filterQuery[key];
  });

  const arrBrand = [];
  let type = {};

  if (filterQuery.search) {
    const brand = await Brand.find({
      brand: { $regex: filterQuery?.search, $options: "i" },
    });
    brand.forEach((e) => {
      arrBrand.push(e._id);
    });
  }

  types.forEach(async (e) => {
    if (filterQuery.type === e) {
      type = { [filterQuery.type]: 1 };
    }
  });
  const filterConditions = filterQuery.search
    ? [
        {
          $or: [
            { authorBrand: { $in: arrBrand } },
            { model: { $regex: filterQuery.search } },
          ],
        },
      ]
    : null;

  const filterCrirerial = filterQuery.search ? { $and: filterConditions } : {};

  let data = await Product.find(filterCrirerial)
    .sort(type)
    .collation({ locale: "en_US", numericOrdering: true })
    .populate([
      { path: "authorCatego", model: Catego },
      {
        path: "authorBrand",
        model: Brand,
      },
    ]);

  const offset = limit * (page - 1);
  const count = await Product.countDocuments(filterCrirerial);
  const totalPage = Math.ceil(count / limit);

  data = await data
    // .sort(() => {
    //   return Math.random() - 0.5;
    // })
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
  const productId = req.params.productId;

  const product = await Product.findById(productId)
    .populate({ path: "authorCatego", model: Catego })
    .populate({ path: "authorBrand", model: Brand });
  if (!product)
    throw new AppError(400, "Product Not Exists", "Get Single Product Error");

  sendResponse(res, 200, true, product, null, "Get Single Product Success");
});
//get list brand procuct
productController.getListBrandProduct = catchAsync(async (req, res, next) => {
  let { page, limit, ...filterQuery } = req.query;
  const allow = ["brand", "search"];

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  const offset = limit * (page - 1);
  const count = await Product.countDocuments({});
  const totalPage = Math.ceil(count / limit);

  let products = await Product.find({});
  products = products
    .sort(() => {
      return Math.random() - 0.5;
    })
    .slice(offset, offset + limit);

  sendResponse(
    res,
    200,
    true,
    products,
    null,
    "Get List Brand Product Success"
  );
});
module.exports = productController;
