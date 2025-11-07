const mongoose = require("mongoose");
const Product = require("../models/productModel");

const getProducts = async (req, res, next) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const search = req.query.search;
    const filter = {};

    if (search) {
      filter.category = search;
    }

    const products = await Product.find(filter).limit(limit).skip((page - 1) * limit);
    const countProducts = await Product.find(filter).countDocuments();
    res.status(200).send({
      products,
      totalPages: Math.ceil(countProducts / limit)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts };