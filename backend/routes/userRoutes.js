const express = require("express");
const { getUsers } = require("../controllers/userControllers");
const userRoutes = express.Router();

// GET: /api/users
userRoutes.get("/", getUsers);

module.exports = userRoutes;