const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const app = express();
const port = 5001;

require("dotenv").config();

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// req = request, res = response
app.get("/", (req, res) => {
  res.send("Welcome to MERN-STACK-ECOMMERCE");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((req, res, next) => {
  const error = new Error("404 not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    success: false,
    message: error.message || "Sorry! Something went wrong."
  });
});

app.listen(port, () => {
  console.log(`Backend app running at http://localhost:${port}`);
});