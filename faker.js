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
  data = data.filter((e) => e.brand_name === "Apple"); //Samsung, Apple, Xiaomi, HUAWEI, Sony
  data = new Set(data.filter((e) => e.model_name));
  data = Array.from(data);
  const id = "64084755428b78856ae0dc7c";
  const brandPhone = await Phone.findById(id);

  // data = await data.find((e) => e.brand_name === "Sony");
  // await Phone.create({ brand: data.brand_name.toLowerCase() });

  data.forEach(async (e) => {
    await ModelPhone.create({
      authorPhone: brandPhone._id,
      model: e.model_name.toLowerCase(),
      latest_price: e.best_price.replace(".0", ""),
      old_price: e.highest_price.replace(".0", ""),
      discount: e.sellers_amount,
      ratings: Math.floor(Math.random() * (6 - 1) + 1),
      os: e.os.toLowerCase(),
      memory_size: e.memory_size.replace(".0", ""),
      battery_size: e.battery_size.replace(".0", ""),
      screen_size: e.screen_size,
      imageUrl: `https://shop-app-backend-production.up.railway.app/imagephone/apple${Math.floor(
        Math.random() * (12 - 1) + 1
      )}.jpg`,
    });
  });

  await Phone.findByIdAndUpdate(id, {
    countphone: data.length,
    quantityRemaining: data.length,
  });
  console.log(data);
  console.log(data.length);
};

fakerShop();
