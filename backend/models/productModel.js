const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  imgPath: String,
  productName: String,
  description: String,
  category: String,
  discount: Number,
  price: Number,
  inStock: Number
});

const Product = model("Product", productSchema);

module.exports = Product;