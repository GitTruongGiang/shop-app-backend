const { catchAsync, sendResponse } = require("../helpers/utils");
const ModelLaptop = require("../model/modelLaptop");
const Laptop = require("../model/laptop");
const User = require("../model/user");

const laptopController = {};

laptopController.getListLaptop = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(400, "User Not Exists", "Get List LapTop Error");
  const data = await ModelLaptop.find({}).populate({
    path: "authorLaptop",
    model: Laptop,
  });

  sendResponse(res, 200, true, data, null, "Get List Laptop Success");
});

module.exports = laptopController;
