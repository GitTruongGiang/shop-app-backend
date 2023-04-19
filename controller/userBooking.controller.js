const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const User = require("../model/user");
const UserBooking = require("../model/userBooking");

const userBookingController = {};
// get user Booking
userBookingController.getUserBooking = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  let user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(
      400,
      "Get User Booking Product",
      "Get User Booking Product Error"
    );
  user = await UserBooking.find({ authorUser: user._id });
  if (!user)
    throw new AppError(400, "Get User Booking ", "Get User Booking Error");

  sendResponse(res, 200, true, user, null, "Get User Booking Product");
});

module.exports = userBookingController;
