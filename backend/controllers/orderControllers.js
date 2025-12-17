const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const checkout = async (req, res, next) => {
  try {
    const cartItems = req.body.cartItems;
    const totalPrice = req.body.totalPrice;
    const email = req.body.email;
    const authToken = req.headers.auth_token;

    const decoded = jwt.verify(authToken, process.env.PRIVATE_KEY);

    const newCartItems = cartItems.map((cartItem) => ({
      productId: cartItem._id,
      productName: cartItem.productName,
      category: cartItem.category,
      discount: cartItem.discount,
      price: cartItem.price,
      quantity: cartItem.quantity
    }));

    const date = new Date();
    const newDate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };

    const newOrder = new Order({ email, cartItems: newCartItems, totalPrice, date: newDate });
    const savedOrder = await newOrder.save();

    const lineItems = cartItems.map((cartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.productName
        },
        unit_amount: cartItem.price * 100
      },
      quantity: cartItem.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.API_BASE_URL}/api/orders/verify-checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.API_BASE_URL}/api/orders/verify-checkout?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        order_id: savedOrder._id.toString()
      }
    });
    
    res.send({
      sessionId: session.id,
      sessionURL: session.url
    });
  } catch (error) {
    next(error);
  }
};

const verifyCheckout = async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata.order_id;

    if (session.payment_status === "paid") {
      const result = await Order.findOne({ _id: orderId });
      const order = JSON.parse(JSON.stringify(result));
      if (order.orderConfirmation) {
        /*
          * If the order has already confirmed, prevent re-verification of this order
          * Otherwise, in-stock item count of each products of this order will be reduced in the database
          */
         return res.redirect(`http://localhost:3001/verify-order?order_id=${orderId}`);
      }
      order.cartItems.forEach(async (cartItem) => {
        const product = await Product.findOne({ _id: cartItem.productId });
        const remainingItems = product.inStock - cartItem.quantity;
        if (remainingItems > 0) {
          await Product.findOneAndUpdate({ _id: product._id }, { $set: { inStock: remainingItems } });
        } else {
          cartItem.outOfStock = true;
          order.availability = "Inventory Shortage";
        }
      });
      await Order.findOneAndUpdate({ _id: orderId }, { $set: {
        email: order.email,
        cartItems: order.cartItems,
        totalPrice: order.totalPrice,
        paymentStatus: "paid",
        orderConfirmation: true,
        availability: order.availability,
        date: order.date
      } });
      res.redirect(`http://localhost:3001/verify-order?order_id=${orderId}`);
    } else {
      res.redirect(`http://localhost:3001/verify-order?order_id=${orderId}`);
    }
  } catch (error) {
    await mongoose.connection.close();
    next(error);
  }
};

const verifyOrder = async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const authToken = req.headers.auth_token;

    const decoded = jwt.verify(authToken, process.env.PRIVATE_KEY);

    const order = await Order.findOne({ _id: orderId });

    if (order.paymentStatus === "paid") {
      res.status(200).send({
        success: true,
        message: `Thanks for shopping with us. Your order is confirmed successfully. Here's your order id for your records: ${orderId}`
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Sorry! Your order was not confirmed."
      });
    }
  } catch (error) {
    next(error);
  }
};

const countOrders = async (req, res, next) => {
  try {
    const totalOrders = await Order.find({ shippingStatus: req.query.shipping_status }).countDocuments();
    res.send({ totalOrders });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ shippingStatus: req.query.shipping_status });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkout,
  verifyCheckout,
  verifyOrder,
  countOrders,
  getOrders
};