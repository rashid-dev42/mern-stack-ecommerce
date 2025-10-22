const express = require("express");
const { signUp, getUsers, signIn } = require("../controllers/userControllers");
const userRoutes = express.Router();

// POST: /api/users/sign-up
userRoutes.post("/sign-up", signUp);

// POST: /api/users/sign-in
userRoutes.post("/sign-in", signIn);

// GET: /api/users
userRoutes.get("/", getUsers);

module.exports = userRoutes;