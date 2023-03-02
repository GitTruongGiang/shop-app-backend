const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const bcrypt = require("bcryptjs");
const User = require("../model/user");

const userController = {};

// create user {normal, master}
userController.createUser = catchAsync(async (req, res, next) => {
  let { email, password, name, role } = req.body;

  if (role && role === "master") {
    let user = await User.findOne({ email });
    if (user) throw new AppError(400, "User exists", "Create User Error");
    if (password.lenght === 6)
      throw new AppError(
        400,
        "Password must be 6 characters",
        "Create User Error"
      );
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({ email, password, name, role });
    const accessToken = await user.generateToken();
    sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Create User Success"
    );
  } else {
    let user = await User.findOne({ email });
    if (user) throw new AppError(400, "User exists", "Create User Error");
    if (password.lenght === 6)
      throw new AppError(
        400,
        "Password must be 6 characters",
        "Create User Error"
      );
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({ email, password, name });
    const accessToken = await user.generateToken();
    sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Create User Success"
    );
  }
});
// get user me
userController.getUser = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const user = await User.findById(currentUserId);
  if (!user) throw new AppError(400, "User Not Exists", "Get User Me Error");
  sendResponse(res, 200, true, user, null, "Get User Me Success");
});
// update user
userController.updateUser = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const userId = req.params.userId;

  if (currentUserId !== userId)
    throw new AppError(400, "User Not Match", "Update User Error");

  let user = await User.findById(userId);
  if (!user) throw new AppError(400, "User Not exstis", "Update User Error");

  const allow = ["phone", "address", "avatarURL"];
  allow.forEach((ele) => {
    if (req.body[ele] !== undefined) {
      user[ele] = req.body[ele];
    }
  });
  await user.save();

  sendResponse(res, 200, true, user, null, "Update User Success");
});
// deleted user
userController.deletedUser = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const userId = req.params.userId;

  if (currentUserId !== userId)
    throw new AppError(400, "User Not Match", "Deleted User Error");
  let user = await User.findById(userId);
  if (!user) throw new AppError(400, "User Not exstis", "Deleted User Error");

  user = await User.deleteOne({ _id: user._id });

  sendResponse(res, 200, true, user, null, "deleted User Success");
});

module.exports = userController;
