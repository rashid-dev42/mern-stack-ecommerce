const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartItemSchema = new Schema({
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  outOfStock: {
    type: Boolean,
    default: false
  }
});

const dateSchema = new Schema({
  day: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

const orderSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  cartItems: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    default: "pending"
  },
  orderConfirmation: {
    type: Boolean,
    default: false
  },
  availability: {
    type: String,
    enum: {
      values: ["Available", "Inventory Shortage"],
      message: 'Availability `{VALUE}` is not valid'
    },
    default: "Available"
  },
  date: dateSchema
});

const Order = model("Order", orderSchema);

module.exports = Order;