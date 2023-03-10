const express = require("express");
const { param } = require("express-validator");
const {
  getAllProduct,
  getSingleProduct,
} = require("../controller/product.controller");
const authentication = require("../middlwe/authentication");
const validations = require("../middlwe/validations");
const router = express.Router();

// get all product
router.get("/allproduct", validations.validate([]), getAllProduct);
// get single product
router.get(
  "/single/:productId",
  authentication.loginRequired,
  validations.validate([
    param("productId", "invalid productId")
      .exists()
      .notEmpty()
      .custom(validations.checkObjectId),
  ]),
  getSingleProduct
);
module.exports = router;
