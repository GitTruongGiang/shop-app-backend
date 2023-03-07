const express = require("express");
const { param } = require("express-validator");
const {
  getListLaptop,
  getSingleBrand,
} = require("../controller/laptop.controller");
const authentication = require("../middlwe/authentication");
const validations = require("../middlwe/validations");
const router = express.Router();

// get list laptop
router.get(
  "/listlaptop",
  authentication.loginRequired,
  validations.validate([]),
  getListLaptop
);
// get single brand laptop
router.post(
  "/singlebrand:laptopId",
  authentication.loginRequired,
  validations.validate([
    param("laptopId", "invalid laptopnId")
      .exists()
      .notEmpty()
      .custom(validations.checkObjectId),
  ]),
  getSingleBrand
);

module.exports = router;
