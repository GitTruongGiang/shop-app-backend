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
  data = new Set(data.filter((e) => e.brand === "APPLE")); //lenovo, apple, asus, dell, acer
  data = Array.from(data);
  const brandLaptop = await Laptop.find({ brand: "apple" });
  const newData = [];
  // data.forEach((items) => {
  //   newData.push({
  //     authorLaptop: brandLaptop[0]._id,
  //     model: items.model.toLowerCase(),
  //     price: items.latest_price,
  //     ratings: items.ratings,
  //     weight: items.weight,
  //     os: items.os.toLowerCase(),
  //     os_bit: items.os_bit,
  //     ssd: items.ssd,
  //     ram_gb: items.ram_gb,
  //     ram_type: items.ram_type,
  //     processor_brand: items.processor_brand.toLowerCase(),
  //     processor_name: items.processor_name.toLowerCase(),
  //     processor_gnrtn: items.processor_gnrtn.toLowerCase(),
  //   });
  // });
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    newData.push({
      authorLaptop: brandLaptop[0]._id,
      model: data[i].model.toLowerCase(),
      price: data[i].latest_price,
      ratings: data[i].ratings,
      weight: data[i].weight,
      os: data[i].os.toLowerCase(),
      os_bit: data[i].os_bit,
      ssd: data[i].ssd,
      ram_gb: data[i].ram_gb,
      ram_type: data[i].ram_type,
      processor_brand: data[i].processor_brand.toLowerCase(),
      processor_name: data[i].processor_name.toLowerCase(),
      processor_gnrtn: data[i].processor_gnrtn.toLowerCase(),
    });
  }
  // newData.forEach(async (model) => {
  //   await ModelLaptop.create(model);
  // });
  console.log(newData);
};

fakerShop();
