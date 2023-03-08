const express = require("express");
const { getAllProduct } = require("../controller/product.controller");
const authentication = require("../middlwe/authentication");
const validations = require("../middlwe/validations");
const router = express.Router();

// get all product
router.post("/allproduct", validations.validate([]), getAllProduct);
module.exports = router;
