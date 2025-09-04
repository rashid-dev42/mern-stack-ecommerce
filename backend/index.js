const express = require("express");
const app = express();
const port = 5001;

// req = request, res = response
app.get("/", (req, res) => {
  res.send("Welcome to MERN-STACK-ECOMMERCE");
});

app.listen(port, () => {
  console.log(`Backend app running at http://localhost:${port}`);
});