const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const Brand = require("../model/brand");
const Catego = require("../model/category");
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

  let orther = await Orther.findOne({ userId: user._id });

  let countQuanlity;
  let totalAmount;

  if (!orther) {
    const ortherItems = [
      {
        name: `${product.authorBrand.brand} ${product.model}`,
        description:
          `${product.weight} ${product.os} ${product.os_bit} ${product.ssd} ${product.ram_gb} ${product.processor_brand} ${product.processor_name} ${product.memory_size} ${product.battery_size} ${product.screen_size} ${product.dimensions} ${product.zoomWide} ${product.zoomTele} ${product.maxResolution} ${product.lowResolution}`.trim(),
        latestPrice: product.latest_price,
        oldPrice: product.old_price,
        totalAmount: product.latest_price,
        discount: product.discount,
        imageUrl: product.imageUrl,
        quantity: "1",
        productId,
      },
    ];
    await Orther.create({
      userId: currentUserId,
      ortherItems,
      total: 1,
    });
  } else {
    const indexOrther = orther.ortherItems.findIndex((e) => {
      countQuanlity = parseInt(e.quantity) + 1;
      totalAmount = parseInt(e.totalAmount) * countQuanlity;
      return e.productId.equals(product._id);
    });
    if (indexOrther !== -1) {
      await Orther.updateOne(
        { _id: orther._id },
        {
          $set: {
            "ortherItems.$[element].quantity": countQuanlity,
            "ortherItems.$[element].totalAmount": totalAmount,
          },
          total: orther.total + 1,
        },
        {
          arrayFilters: [{ "element.productId": { $eq: product._id } }],
        }
      );
    } else {
      const ortherItems = {
        name: `${product.authorBrand.brand} ${product.model}`,
        description:
          `${product.weight} ${product.os} ${product.os_bit} ${product.ssd} ${product.ram_gb} ${product.processor_brand} ${product.processor_name} ${product.memory_size} ${product.battery_size} ${product.screen_size} ${product.dimensions} ${product.zoomWide} ${product.zoomTele} ${product.maxResolution} ${product.lowResolution}`.trim(),
        latestPrice: product.latest_price,
        oldPrice: product.old_price,
        totalAmount: product.latest_price,
        discount: product.discount,
        imageUrl: product.imageUrl,
        quantity: "1",
        productId,
      };
      await Orther.updateOne(
        { _id: orther._id },
        {
          $push: { ortherItems: ortherItems },
          total: orther.total + 1,
        }
      );
    }
  }
  sendResponse(res, 200, true, {}, null, "Create Orther Success");
});

// get list orther
ortherController.getListOrther = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;

  const user = await User.findById(currentUserId);
  if (!user) throw new AppError(400, "Get List Orther Error");

  const orthers = await Orther.findOne({ userId: currentUserId });
  let data = [];
  if (orthers !== null) {
    data = orthers.ortherItems;
  }

  sendResponse(
    res,
    200,
    true,
    { data, total: orthers?.total },
    null,
    "Get List Orther Success"
  );
});

// update orther
ortherController.updateCountOrther = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const ortherId = req.params.ortherId;
  const { quantity } = req.body;

  if (quantity === 0) {
    throw new AppError(400, "Quantity Cannot Be 0");
  }
  const user = await User.findById(currentUserId);
  if (!user) throw new AppError(400, "Update Orther Error");

  const orthers = await Orther.findOne({ userId: currentUserId });

  let totalAmount;
  const ortherIndex = orthers.ortherItems.findIndex((e) => {
    totalAmount = parseInt(e.totalAmount) * parseInt(quantity);
    return e._id.equals(ortherId);
  });

  if (ortherIndex !== -1) {
    let total = orthers.total + 1;

    await Orther.updateOne(
      { _id: orthers._id },
      {
        $set: {
          "ortherItems.$[element].quantity": quantity,
          "ortherItems.$[element].totalAmount": totalAmount,
        },
        total: total,
      },
      {
        arrayFilters: [{ "element._id": { $eq: ortherId } }],
      }
    );
  } else {
    throw new AppError(
      400,
      "Product Not Exists",
      "Update Single Product Error"
    );
  }

  sendResponse(res, 200, true, {}, null, "Update Orther Success");
});
// deleted single product orther
ortherController.deletedSingleProudctOrther = catchAsync(
  async (req, res, next) => {
    const currentUserId = req.userId;
    const ortherId = req.params.ortherId;

    const user = await User.findById(currentUserId);
    if (!user)
      throw new AppError(400, "User Not Exists", "Create Orther Error");

    const orthers = await Orther.findOne({ userId: currentUserId });

    let quantity;
    const ortherIndex = orthers.ortherItems.findIndex((e) => {
      quantity = parseInt(e.quantity);
      return e._id.equals(ortherId);
    });

    if (ortherIndex !== -1) {
      await Orther.updateOne(
        { _id: orthers._id },
        {
          $pull: { ortherItems: { _id: ortherId } },
          total: orthers.total - quantity,
        }
      );
    }
    sendResponse(res, 200, true, {}, null, "deleted Orther Success");
  }
);
// update status orther
ortherController.updateOrther;
module.exports = ortherController;
