const express = require("express");
const {
  checkout,
  verifyCheckout,
  verifyOrder,
  countOrders,
  getOrders 
} = require("../controllers/orderControllers");
const orderRoutes = express.Router();

// POST: /api/orders/checkout
orderRoutes.post("/checkout", checkout);

// GET: /api/orders/verify-checkout
orderRoutes.get("/verify-checkout", verifyCheckout);

// POST: /api/orders/verify-order
orderRoutes.post("/verify-order", verifyOrder);

// GET: /api/orders/count-orders
orderRoutes.get("/count-orders", countOrders);

// GET: /api/orders/get-orders
orderRoutes.get("/get-orders", getOrders);

module.exports = orderRoutes;