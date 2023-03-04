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
    if (password.length !== 8)
      throw new AppError(
        400,
        "Password must be 8 characters",
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
    if (password.length !== 8)
      throw new AppError(
        400,
        "Password must be 8 characters",
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
  const currentUserId = await req.userId;
  const userId = await req.params.userId;

  if (currentUserId !== userId)
    throw new AppError(400, "User Not Match", "Update User Error");

  let user = await User.findById(userId);
  if (!user) throw new AppError(400, "User Not exstis", "Update User Error");

  if (req.body.phone.length !== 10)
    throw new AppError(400, "Invalid Phone Number");

  const allow = ["name", "phone", "address", "avatarUrl"];

  allow.forEach(async (ele) => {
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
// reset password
userController.resetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  let user = await User.find({ email }, "+password");
  if (!user) throw new AppError(400, "User Not Exists", "Reset Password Error");
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("12345678", salt);
  console.log(password);
  user = await User.updateOne({ email: email }, { password: password });
  sendResponse(res, 200, true, user, null, "Reset Password Success");
});
module.exports = userController;
