const { catchAsync, sendResponse } = require("../helpers/utils");
const Laptop = require("../model/laptop");
const ModelLaptop = require("../model/modelLaptop");
const User = require("../model/user");

const shopController = {};

shopController.getAllListShop = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  let { page, limit, ...filterQuery } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

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

  const offset = limit * (page - 1);
  const count = await newData.length;
  const totalPage = Math.ceil(count / limit);

  newData = newData
    .sort((a, b) => {
      const nameA = Number(a.price);
      const nameB = Number(b.price);
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    .slice(offset, offset + limit);

  await sendResponse(
    res,
    200,
    true,
    { data: newData, totalPage },
    null,
    "Get All List Shop Success"
  );
});

module.exports = shopController;
