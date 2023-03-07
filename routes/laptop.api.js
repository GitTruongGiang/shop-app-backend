const express = require("express");
const { getListLaptop } = require("../controller/laptop.controller");
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

module.exports = router;
