var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("hello worrd");
});

const createData = require("./createDataApi/index")

const authApi = require("./auth.api");
const userApi = require("./user.api");
const productApi = require("./product.api");
const ortherApi = require("./orther.api");
const reviewApi = require("./review.api");

router.use("/auth", authApi);
router.use("/users", userApi);
router.use("/products", productApi);
router.use("/orther", ortherApi);
router.use("/reviews", reviewApi);


router.use("/data", createData)

module.exports = router;
