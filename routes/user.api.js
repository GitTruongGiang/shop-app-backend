const express = require("express");
const { body, param } = require("express-validator");
const {
  createUser,
  getUser,
  updateUser,
  deletedUser,
} = require("../controller/user.controller");
const authentication = require("../middlwe/authentication");
const validations = require("../middlwe/validations");
const router = express.Router();

// create User
router.post(
  "/",
  validations.validate([
    body("email", "invalid email")
      .exists()
      .isEmail()
      .notEmpty()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "invalid password").exists().notEmpty(),
    body("name", "invalid name").exists().notEmpty().isString(),
  ]),
  createUser
);
// get user me
router.get(
  "/me",
  authentication.loginRequired,
  validations.validate([]),
  getUser
);
// update user
router.put(
  "/update/:userId",
  authentication.loginRequired,
  validations.validate([
    param("userId", "invalid userId")
      .exists()
      .notEmpty()
      .custom(validations.checkObjectId),
  ]),
  updateUser
);
// deleted user
router.delete(
  "/deleted/:userId",
  authentication.loginRequired,
  validations.validate([
    param("userId", "invalid userId")
      .exists()
      .notEmpty()
      .custom(validations.checkObjectId),
  ]),
  deletedUser
);

module.exports = router;
