const express = require("express");
const { getAllProduct } = require("../controller/product.controller");
const validations = require("../middlwe/validations");
const router = express.Router();

// get all product
router.get("/allproduct", validations.validate([]), getAllProduct);
module.exports = router;
