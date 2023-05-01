const express = require("express");
const authentication = require("../middlwe/authentication");
const validations = require("../middlwe/validations");
const { addReview } = require("../controller/review.controller");
const router = express.Router();

//create review
router.post(
  "/:productId",
  authentication.loginRequired,
  validations.validate([]),
  addReview
);

module.exports = router;
