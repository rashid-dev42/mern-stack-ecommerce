const express = require("express");
const { checkout, verifyCheckout, verifyOrder } = require("../controllers/orderControllers");
const orderRoutes = express.Router();

// POST: /api/orders/checkout
orderRoutes.post("/checkout", checkout);

// GET: /api/orders/verify-checkout
orderRoutes.get("/verify-checkout", verifyCheckout);

// POST: /api/orders/verify-order
orderRoutes.post("/verify-order", verifyOrder);

module.exports = orderRoutes;