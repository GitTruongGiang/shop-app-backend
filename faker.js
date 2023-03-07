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

const fakerShop = async () => {
  let data = await csv().fromFile("DataLaptop.csv");
  data = new Set(data.filter((e) => e.brand === "DELL")); //lenovo, apple, asus, dell, acer
  data = Array.from(data);
  const id = "640596512636ded2a61de4c7";
  const brandLaptop = await Laptop.findById(id);

  data.forEach(async (e) => {
    await ModelLaptop.create({
      authorLaptop: brandLaptop._id,
      model: e.model.toLowerCase(),
      price: e.latest_price,
      ratings: Math.floor(Math.random() * (6 - 1) + 1),
      weight: e.weight,
      os: e.os.toLowerCase(),
      os_bit: e.os_bit,
      ssd: e.ssd,
      ram_gb: e.ram_gb,
      ram_type: e.ram_type,
      processor_brand: e.processor_brand.toLowerCase(),
      processor_name: e.processor_name.toLowerCase(),
      processor_gnrtn: e.processor_gnrtn.toLowerCase(),
      imageUrl: `https://shop-app-backend-production.up.railway.app/image/dell${Math.floor(
        Math.random() * (7 - 1) + 1
      )}.jpg`,
    });
  });

  await Laptop.findByIdAndUpdate(id, {
    countlaptop: data.length,
    quantityRemaining: data.length,
  });
};

fakerShop();
