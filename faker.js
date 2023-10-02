const csv = require("csvtojson");
const Brand = require("./model/brand");
const Catego = require("./model/category");
const Product = require("./model/product");
const Total = require("./model/total");
const { Listbrand, Listcategory } = require("./util/option");
const { default: mongoose } = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shopapp:shopapp-1@shop-app.ejjh2cf.mongodb.net/shopapp"
  )
  .then(() => console.log("db connect success"))
  .catch((err) => console.log(err));

const loadingBrand = async () => {
  Listbrand.forEach(async (e) => {
    let brand = await Brand.findOne({ brand: e });
    if (!brand) {
      brand = await Brand.create({ brand: e });
    }
  });
};
const loadingcategories = async () => {
  Listcategory.forEach(async (e) => {
    let category = await Catego.findOne({ name: e });
    if (!category) {
      category = await Catego.create({ name: e });
    }
  });
};
const fakerShopLaptop = async () => {
  let data = await csv().fromFile("./dataCsv/laptop/DataLaptopAcer.csv"); // laptop, camera, phone, rolex
  data = new Set(data.map((e) => e));
  data = Array.from(data);
  const category = await Catego.findOne({ name: "laptop" }); // laptop, camera, phone, rolex
  let brand = await Brand.findOne({ brand: "acer" });
  const newPro = ["new", "old"];

  for (let i = 0; i < data.length; i++) {
    const random = Math.floor(Math.random() * newPro.length);
    let discount = Number(Math.floor(Math.random() * (20 - 10) + 10));
    const total = Math.floor(Number(data[i]?.latest_price) * (discount / 100));
    const latest_price = Number(data[i]?.latest_price) - total;
    let img = [];
    if (data[i]?.img_url1) {
      img.push(data[i]?.img_url1);
    }
    if (data[i]?.img_url2) {
      img.push(data[i]?.img_url2);
    }
    if (data[i]?.img_url3) {
      img.push(data[i]?.img_url3);
    }
    if (data[i]?.img_url4) {
      img.push(data[i]?.img_url4);
    }
    if (data[i]?.img_url5) {
      img.push(data[i]?.img_url5);
    }
    const product = await Product.create({
      authorCatego: category._id,
      authorBrand: brand._id,
      imageUrl: img,
      ratings: Math.floor(Math.random() * (5 - 3) + 3),
      newProduct: newPro[random],
      description: {
        model: `${data[i].brand} ${data[i]?.model?.toLowerCase()}`,
        latest_price: Number(data[i]?.latest_price) === 0 ? 1000 : latest_price,
        old_price: Number(data[i]?.old_price),
        discount: Number(data[i]?.latest_price) === 0 ? 0 : discount,
        dimensions: data[i]?.Dimensions,
        zoomWide: data[i]?.zoomWide,
        zoomTele: data[i]?.zoomTele,
        maxResolution: data[i]?.maxResolution,
        lowResolution: data[i]?.lowResolution,
        ratings: Math.floor(Math.random() * (6 - 3) + 3),
        os: data[i]?.os?.toLowerCase(),
        weight: data[i]?.weight?.toLowerCase(),
        os_bit: data[i]?.os_bit,
        ssd: data[i]?.ssd,
        hdd: data[i]?.hdd,
        ram_gb: data[i]?.ram_gb?.replace(" GB", ""),
        ram_type: data[i]?.ram_type,
        processor_brand: data[i]?.processor_brand,
        processor_name: data[i]?.processor_name,
        processor_gnrtn: data[i]?.processor_gnrtn,
        memory_size: data[i]?.memory_size?.replace(".0", "") || "32",
        battery_size: data[i]?.battery_size?.replace(".0", "") || "2691",
        screen_size: data[i]?.screen_size || "6",
      },
    });
  }

};
const fakerShopCamera = async () => {
  let data = await csv().fromFile("./dataCsv/camera/DatacameraFujifilm.csv"); // laptop, camera, phone, rolex
  data = new Set(data.map((e) => e));
  data = Array.from(data);
  const category = await Catego.findOne({ name: "camera" }); // laptop, camera, phone, rolex
  let brand = await Brand.findOne({ brand: "fujifilm" });
  const newPro = ["new", "old"];

  for (let i = 0; i < data.length; i++) {
    const random = Math.floor(Math.random() * newPro.length);
    let discount = Number(Math.floor(Math.random() * (20 - 10) + 10));
    const total = Math.floor(Number(data[i]?.Price) * (discount / 100));
    const latest_price = Number(data[i]?.Price) - total;
    let img = [];
    if (data[i]?.img_url1) {
      img.push(data[i]?.img_url1);
    }
    if (data[i]?.img_url2) {
      img.push(data[i]?.img_url2);
    }
    if (data[i]?.img_url3) {
      img.push(data[i]?.img_url3);
    }
    if (data[i]?.img_url4) {
      img.push(data[i]?.img_url4);
    }
    if (data[i]?.img_url5) {
      img.push(data[i]?.img_url5);
    }
    const product = await Product.create({
      authorCatego: category._id,
      authorBrand: brand._id,
      imageUrl: img,
      ratings: Math.floor(Math.random() * (5 - 3) + 3),
      newProduct: newPro[random],
      description: {
        model: data[i]?.model?.toLowerCase() || data[i]?.Model,
        latest_price: Number(data[i]?.latest_price) === 0 ? 1000 : latest_price,
        old_price: Number(data[i]?.Price),
        discount: Number(data[i]?.Price) === 0 ? 0 : discount,
        dimensions: data[i]?.Dimensions,
        zoomWide: data[i]?.zoomWide,
        zoomTele: data[i]?.zoomTele,
        maxResolution: data[i]?.maxResolution,
        lowResolution: data[i]?.lowResolution,
        ratings: Math.floor(Math.random() * (6 - 3) + 3),
        os: data[i]?.os?.toLowerCase(),
        weight: data[i]?.weight?.toLowerCase(),
        os_bit: data[i]?.os_bit,
        ssd: data[i]?.ssd,
        hdd: data[i]?.hdd,
        ram_gb: data[i]?.ram_gb?.replace(" GB", ""),
        ram_type: data[i]?.ram_type,
        processor_brand: data[i]?.processor_brand,
        processor_name: data[i]?.processor_name,
        processor_gnrtn: data[i]?.processor_gnrtn,
        memory_size: data[i]?.memory_size?.replace(".0", "") || "32",
        battery_size: data[i]?.battery_size?.replace(".0", "") || "2691",
        screen_size: data[i]?.screen_size || "6",
      },
    });
  }

};
const fakerTotal = async () => {
  const category = await Catego.findOne({ name: "phone" });
  const brand = await Brand.findOne({ brand: "xiaomi" });
  const products = await Product.find({
    authorCatego: category._id,
    authorBrand: brand._id,
  });
  const total = await Total.create({
    authorCatego: category._id,
    authorBrand: brand._id,
    totalProduct: Number(products.length),
    quantityRemaining: Number(products.length),
  });
}

