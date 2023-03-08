const csv = require("csvtojson");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://shopapp:shopapp-1@shop-app.ejjh2cf.mongodb.net/shopapp"
  )
  .then(() => console.log("db connect success"))
  .catch((err) => console.log(err));

const Phone = require("./model/phone");
const ModelPhone = require("./model/modelPhone");

const fakerShop = async () => {
  let data = await csv().fromFile("DataPhone.csv");
  data = data.filter((e) => e.brand_name === "Sony"); //Samsung, Apple, Xiaomi, HUAWEI, Sony
  data = new Set(data.filter((e) => e.model_name));
  data = Array.from(data);
  const id = "6408492b6fa417ae7660aee5";
  const brandPhone = await Phone.findById(id);

  // data = await data.find((e) => e.brand_name === "Sony");
  // await Phone.create({ brand: data.brand_name.toLowerCase() });

  data.forEach(async (e) => {
    await ModelPhone.create({
      authorPhone: brandPhone._id,
      model: e.model_name.toLowerCase(),
      latest_price: e.best_price.replace(".0", "") || "2900",
      old_price: e.highest_price.replace(".0", "") || "3000",
      discount: e.sellers_amount,
      ratings: Math.floor(Math.random() * (6 - 1) + 1),
      os: e.os.toLowerCase(),
      memory_size: e.memory_size.replace(".0", "") || "32",
      battery_size: e.battery_size.replace(".0", "") || "2691",
      screen_size: e.screen_size || "6",
      imageUrl: `https://shop-app-backend-production.up.railway.app/imagephone/sony${Math.floor(
        Math.random() * (8 - 1) + 1
      )}.png`,
    });
  });

  // let count = await brandPhone.countphone;
  // count = (await count) + data.length;

  await Phone.findByIdAndUpdate(id, {
    countphone: data.length,
    quantityRemaining: data.length,
  });

  console.log(brandPhone.countphone);
  // console.log(data);
  console.log(data.length);
};

fakerShop();
