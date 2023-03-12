const csv = require("csvtojson");
const mongoose = require("mongoose");
const Brand = require("./model/brand");
const Catego = require("./model/category");
const Count = require("./model/count");
const Product = require("./model/product");
mongoose
  .connect(
    "mongodb+srv://shopapp:shopapp-1@shop-app.ejjh2cf.mongodb.net/shopapp"
  )
  .then(() => console.log("db connect success"))
  .catch((err) => console.log(err));

const fakerShop = async () => {
  let data = await csv().fromFile("Datacamera.csv");
  data = data.filter((e) => e.Model.includes("Canon")); //Samsung, Apple, Xiaomi, HUAWEI, Sony //Lenovo, APPLE, ASUS, DELL, acer
  data = new Set(data.map((e) => e));
  data = Array.from(data);
  const category = await Catego.findOne({ name: "watch" });

  const brand = await Brand.findOne({ brand: "canon" });

  // const cate = await Catego.create({ name: "watch" });
  // data = await data.find((e) => e.brand === "Lenovo");
  // let newBrand = await Brand.findOne({ brand: "canon" });
  // if (!newBrand) {
  //   newBrand = await Brand.create({ brand: "canon" });
  // }
  // const countBrand = await Count.create({
  //   authorBrand: newBrand._id,
  //   authorCatego: category._id,
  // });

  data = data.map((e) => {
    console.log(e.Price);
    const discount = Math.floor(Math.random() * 50);
    return {
      ...e,
      ["discount"]: `${discount}`,
      ["old_price"]: e.Price,
      ["latest_price"]: `${
        parseInt(e.Price) - Math.floor(e.Price * (discount / 100))
      }`,
    };
    console.log(Math.floor(179 * (discount / 100)));
    // return {...e , e.discount: }
  });
  const newPro = ["new", "old"];
  data.forEach(async (e) => {
    const random = Math.floor(Math.random() * newPro.length);
    await Product.create({
      authorCatego: category._id,
      authorBrand: brand._id,
      // model: e.model.toLowerCase(),
      model: e.Model.replace("Canon ", "").toLowerCase(),
      // latest_price: e.Price.replace(".0", "") || "2900",
      // old_price: e.highest_price.replace(".0", "") || "3000",
      latest_price: e.latest_price.replace(".0", "") || "2900",
      old_price: e.old_price.replace(".0", "") || "3000",
      discount: e.discount,
      // discount: e.sellers_amount,
      ratings: Math.floor(Math.random() * (6 - 3) + 3),
      // os: e.os.toLowerCase(),
      weight: e.weight.toLowerCase(),
      // os_bit: e.os_bit,
      // ssd: e.ssd,
      // hdd: e.hdd,
      // ram_gb: e.ram_gb.replace(" GB", ""),
      // ram_type: e.ram_type,
      // processor_brand: e.processor_brand,
      // processor_name: e.processor_name,
      // processor_gnrtn: e.processor_gnrtn,
      // memory_size: e.memory_size.replace(".0", "") || "32",
      // battery_size: e.battery_size.replace(".0", "") || "2691",
      // screen_size: e.screen_size || "6",
      newProduct: newPro[random],
      dimensions: e.Dimensions,
      zoomWide: e.zoomWide,
      zoomTele: e.zoomTele,
      maxResolution: e.maxResolution,
      lowResolution: e.lowResolution,
      imageUrl: `https://shop-app-backend-production.up.railway.app/imagewatch/canon${Math.floor(
        Math.random() * (22 - 1) + 1
      )}.jpg`,
    });
  });
  // const del = await Product.deleteMany({
  //   authorBrand: "640d5dd2b1c12eb5df5e0afc",
  // });

  let count = data.length;
  // console.log(data);
  const countBrand = await Count.findByIdAndUpdate(
    { _id: "640d5e8ec4f401e651f6051a" },
    { count: count, quantityRemaining: count }
  );

  // let brandData = await Brand.findById(idbrand);
  // brandData = brandData.count.forEach((e) => {});
  // console.log(newBrand);
};

fakerShop();
