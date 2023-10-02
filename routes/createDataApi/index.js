const express = require("express");
const router = express.Router();

const brandcreate = require("../../controller/createDataController/brand.controller")

router.post("/brand",brandcreate.createBrand)

module.exports = router