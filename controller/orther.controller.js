const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const Brand = require("../model/brand");
const Catego = require("../model/category");
const { count } = require("../model/ordther");
const Orther = require("../model/ordther");
const Product = require("../model/product");
const User = require("../model/user");

const ortherController = {};
// create orther
ortherController.createOrther = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const productId = req.params.productId;

  const user = await User.findById(currentUserId);
  if (!user) throw new AppError(400, "User Not Exists", "Create Orther Error");
  const product = await Product.findById(productId).populate([
    { path: "authorBrand", model: Brand },
    { path: "authorCatego", model: Catego },
  ]);
  if (!product)
    throw new AppError(400, "Product Not Exists", "Create Orther Error");

  let orther = await Orther.find({ userId: user._id });

  if (orther.length < 1) {
    const ortherItems = [
      {
        name: `${product.authorBrand.brand} ${product.model}`,
        description:
          `${product.weight} ${product.os} ${product.os_bit} ${product.ssd} ${product.ram_gb} ${product.processor_brand} ${product.processor_name} ${product.memory_size} ${product.battery_size} ${product.screen_size} ${product.dimensions} ${product.zoomWide} ${product.zoomTele} ${product.maxResolution} ${product.lowResolution}`.trim(),
        price: product.latest_price,
        imageUrl: product.imageUrl,
        quantity: "1",
        productId,
      },
    ];
    orther = await Orther.create({
      userId: currentUserId,
      ortherItems,
      total: 1,
    });
  } else {
    const ortherItems = {
      name: `${product.authorBrand.brand} ${product.model}`,
      description:
        `${product.weight} ${product.os} ${product.os_bit} ${product.ssd} ${product.ram_gb} ${product.processor_brand} ${product.processor_name} ${product.memory_size} ${product.battery_size} ${product.screen_size} ${product.dimensions} ${product.zoomWide} ${product.zoomTele} ${product.maxResolution} ${product.lowResolution}`.trim(),
      price: product.latest_price,
      imageUrl: product.imageUrl,
      quantity: "1",
      productId,
    };
    orther = await Orther.create({
      userId: currentUserId,
      ortherItems: {},
      total: 1,
    });
  }

  // const orther = await Orther.create({ userId: currentUserId });

  // const countTotal = totalOrther.length;
  // await Orther.findByIdAndUpdate(totalOrther._id, { total: countTotal.length });
  sendResponse(res, 200, true, orther, null, "Create Orther Success");
});

module.exports = ortherController;
