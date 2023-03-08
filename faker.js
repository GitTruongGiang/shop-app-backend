const csv = require("csvtojson");
const mongoose = require("mongoose");
const Brand = require("./model/brand");
const Catego = require("./model/category");
const Product = require("./model/product");
mongoose
  .connect(
    "mongodb+srv://shopapp:shopapp-1@shop-app.ejjh2cf.mongodb.net/shopapp"
  )
  .then(() => console.log("db connect success"))
  .catch((err) => console.log(err));

const fakerShop = async () => {
  let data = await csv().fromFile("DataPhone.csv");
  data = data.filter((e) => e.brand_name === "Sony"); //Samsung, Apple, Xiaomi, HUAWEI, Sony //Lenovo, APPLE, ASUS, DELL, acer

  const idCatergory = "6408b30cbabc5c3cd544f895";
  const category = await Catego.findById(idCatergory);

  const idbrand = "6408ba3938c5f567fd0e07e5";
  const brand = await Brand.findById(idbrand);
  console.log(category);

  // data = await data.find((e) => e.brand === "acer");
  // await Brand.create({ brand: "sony" });

  data.forEach(async (e) => {
    await Product.create({
      authorCatego: category._id,
      authorBrand: brand._id,
      model: e.model_name.toLowerCase(),
      latest_price: e.best_price.replace(".0", "") || "2900",
      old_price: e.highest_price.replace(".0", "") || "3000",
      // latest_price: e.latest_price.replace(".0", "") || "2900",
      // old_price: e.old_price.replace(".0", "") || "3000",
      // discount: e.discount,
      // ratings: Math.floor(Math.random() * (6 - 3) + 3),
      os: e.os.toLowerCase(),
      // weight: e.weight.toLowerCase(),
      // os_bit: e.os_bit,
      // ssd: e.ssd,
      // hdd: e.hdd,
      // ram_gb: e.ram_gb.replace(" GB", ""),
      // ram_type: e.ram_type,
      // processor_brand: e.processor_brand,
      // processor_name: e.processor_name,
      // processor_gnrtn: e.processor_gnrtn,
      memory_size: e.memory_size.replace(".0", "") || "32",
      battery_size: e.battery_size.replace(".0", "") || "2691",
      screen_size: e.screen_size || "6",
      imageUrl: `https://shop-app-backend-production.up.railway.app/imagephone/sony${Math.floor(
        Math.random() * (8 - 1) + 1
      )}.png`,
    });
  });

  let count = await brand.count;
  count = count + data.length;

  await Brand.findByIdAndUpdate(idbrand, {
    count: count,
    quantityRemaining: count,
  });

  console.log(data);
};

fakerShop();
