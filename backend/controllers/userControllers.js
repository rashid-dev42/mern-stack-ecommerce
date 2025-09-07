const mongoose = require("mongoose");
const User = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const role = req.query.role;
    const filter = {};
    if (role) {
      filter.role = role;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find(filter, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const countUsers = await User.find(filter).countDocuments();
    res.status(200).send({
      users,
      pages: Math.ceil(countUsers / limit)
    });
  } catch (error) {
    next(error);
  } finally {
    await mongoose.connection.close();
  }
};

module.exports = { getUsers };