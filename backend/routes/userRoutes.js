const express = require("express");
const { signUp, getUsers } = require("../controllers/userControllers");
const userRoutes = express.Router();

// POST: /api/users/sign-up
userRoutes.post("/sign-up", signUp);

// GET: /api/users
userRoutes.get("/", getUsers);

module.exports = userRoutes;