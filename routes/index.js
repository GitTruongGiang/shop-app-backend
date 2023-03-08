var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("hello worrd");
});

const authApi = require("./auth.api");
const userApi = require("./user.api");
const productApi = require("./product.api");

router.use("/auth", authApi);
router.use("/users", userApi);
router.use("/product", productApi);

module.exports = router;
