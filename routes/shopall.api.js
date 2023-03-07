const express = require("express");
const { getAllListShop } = require("../controller/shop.controller");
const authentication = require("../middlwe/authentication");
const validations = require("../middlwe/validations");
const router = express.Router();

router.get(
  "/shopall",
  authentication.loginRequired,
  validations.validate([]),
  getAllListShop
);

module.exports = router;
