const { catchAsync, sendResponse } = require("../helpers/utils");
const Laptop = require("../model/laptop");
const ModelLaptop = require("../model/modelLaptop");
const User = require("../model/user");

const shopController = {};

shopController.getAllListShop = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;

  const user = await User.findById(currentUserId);
  if (!user) throw new AppError(400, "User Not Exists", "Get User Me Error");

  let newData = [];

  const laptop = await ModelLaptop.find({}).populate({
    path: "authorLaptop",
    model: Laptop,
  });

  laptop.forEach(async (e) => {
    await newData.push(e);
  });

  sendResponse(res, 200, true, newData, null, "Get All List Shop Success");
});

module.exports = shopController;
