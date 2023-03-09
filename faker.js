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
  let data = await csv().fromFile("DataLaptop.csv");
  data = data.filter((e) => e.brand === "Lenovo"); //Samsung, Apple, Xiaomi, HUAWEI, Sony //Lenovo, APPLE, ASUS, DELL, acer

  const idCatergory = "6408b2cd6df0de525b1faed2";
  const category = await Catego.findById(idCatergory);

  const idbrand = "640961161455a47d88dc0769";
  const brand = await Brand.findById(idbrand);
  // console.log(category);

  // data = await data.find((e) => e.brand === "Lenovo");
  // const newBrand = await Brand.create({ brand: "acer" });
  // const countBrand = await Count.create({
  //   authorBrand: newBrand._id,
  //   catego: "laptop",
  // });

  data.forEach(async (e) => {
    await Product.create({
      authorCatego: category._id,
      authorBrand: brand._id,
      model: e.model.toLowerCase(),
      // model: e.model_name.toLowerCase(),
      // latest_price: e.best_price.replace(".0", "") || "2900",
      // old_price: e.highest_price.replace(".0", "") || "3000",
      latest_price: e.latest_price.replace(".0", "") || "2900",
      old_price: e.old_price.replace(".0", "") || "3000",
      discount: e.discount,
      ratings: Math.floor(Math.random() * (6 - 3) + 3),
      os: e.os.toLowerCase(),
      weight: e.weight.toLowerCase(),
      os_bit: e.os_bit,
      ssd: e.ssd,
      hdd: e.hdd,
      ram_gb: e.ram_gb.replace(" GB", ""),
      ram_type: e.ram_type,
      processor_brand: e.processor_brand,
      processor_name: e.processor_name,
      processor_gnrtn: e.processor_gnrtn,
      // memory_size: e.memory_size.replace(".0", "") || "32",
      // battery_size: e.battery_size.replace(".0", "") || "2691",
      // screen_size: e.screen_size || "6",
      imageUrl: `https://shop-app-backend-production.up.railway.app/imagelaptop/lenovo${Math.floor(
        Math.random() * (4 - 1) + 1
      )}.jpg`,
    });
  });

  let count = data.length;

  const countBrand = await Count.findOneAndUpdate(
    { authorBrand: brand._id, catego: "laptop" },
    { count: count, quantityRemaining: count }
  );

  // let brandData = await Brand.findById(idbrand);
  // brandData = brandData.count.forEach((e) => {});
  // console.log(newBrand);
  // console.log(countBrand);
  console.log(data[0]);
  console.log(countBrand);
};

fakerShop();
