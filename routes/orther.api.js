const express = require("express");
const { param } = require("express-validator");
const { createOrther } = require("../controller/orther.controller");
const authentication = require("../middlwe/authentication");
const validations = require("../middlwe/validations");
const router = express.Router();

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
module.exports = router;
