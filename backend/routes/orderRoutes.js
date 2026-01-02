const express = require("express");
const {
  checkout,
  verifyCheckout,
  verifyOrder,
  countOrders,
  getOrders, 
  getMyOrders
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

// GET: /api/orders/get-my-orders/:email
orderRoutes.get("/get-my-orders/:email", getMyOrders);

module.exports = orderRoutes;