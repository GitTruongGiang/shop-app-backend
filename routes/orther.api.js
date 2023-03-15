const express = require("express");
const { param } = require("express-validator");
const {
  createOrther,
  getListOrther,
} = require("../controller/orther.controller");
const authentication = require("../middlwe/authentication");
const validations = require("../middlwe/validations");
const router = express.Router();

// create orther
router.post(
  "/:productId",
  authentication.loginRequired,
  validations.validate([
    param("productId", "invalid productId")
      .exists()
      .notEmpty()
      .custom(validations.checkObjectId),
  ]),
  createOrther
);
// get list orther
router.get(
  "/listorther",
  authentication.loginRequired,
  validations.validate([]),
  getListOrther
);
module.exports = router;
