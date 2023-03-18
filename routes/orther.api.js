const express = require("express");
const { param } = require("express-validator");
const {
  createOrther,
  getListOrther,
  updateCountOrther,
  deletedSingleProudctOrther,
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
// update product in orther
router.put(
  "/single/:ortherId",
  authentication.loginRequired,
  validations.validate([
    param("ortherId", "invalid productId")
      .exists()
      .notEmpty()
      .custom(validations.checkObjectId),
  ]),
  updateCountOrther
);
// deleted product in orther
router.delete(
  "/single/:ortherId",
  authentication.loginRequired,
  validations.validate([
    param("ortherId", "invalid productId")
      .exists()
      .notEmpty()
      .custom(validations.checkObjectId),
  ]),
  deletedSingleProudctOrther
);
module.exports = router;
