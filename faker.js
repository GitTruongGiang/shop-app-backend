const csv = require("csvtojson");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://shopapp:shopapp-1@shop-app.ejjh2cf.mongodb.net/shopapp"
  )
  .then(() => console.log("db connect success"))
  .catch((err) => console.log(err));

const Laptop = require("./model/laptop");
const ModelLaptop = require("./model/modelLaptop");
const Phone = require("./model/phone");

const fakerShop = async () => {
  let data = await csv().fromFile("DataPhone.csv");
  data = data.filter((e) => e.brand_name === "Samsung"); //Samsung, Apple, Xiaomi, HUAWEI, Sony
  data = new Set(data.filter((e) => e.model_name));
  data = Array.from(data);
  const id = "640846201c45a41d7f9c28e0";
  const brandPhone = await Laptop.findById(id);

  // data = await data.find((e) => e.brand_name === "Sony");
  // await Phone.create({ brand: data.brand_name.toLowerCase() });

  data.forEach(async (e) => {
    await ModelLaptop.create({
      authorLaptop: brandPhone._id,
      model: e.model_name.toLowerCase(),
      latest_price: e.best_price,
      old_price: e.highest_price,
      discount: e.sellers_amount,
      ratings: Math.floor(Math.random() * (6 - 1) + 1),
      os: e.os.toLowerCase(),
      memory_size: e.memory_size.replace(".0", ""),
      battery_size: e.battery_size.replace(".0", ""),
      screen_size: e.screen_size,
      imageUrl: `https://shop-app-backend-production.up.railway.app/imagephone/samsung${Math.floor(
        Math.random() * (20 - 1) + 1
      )}.jpg`,
    });
  });

  await Laptop.findByIdAndUpdate(id, {
    countlaptop: data.length,
    quantityRemaining: data.length,
  });
  console.log(data);
  console.log(data.length);
};

fakerShop();
