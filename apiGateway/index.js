const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const proxy = require("express-http-proxy");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(morgan());

const targetServiceUrl = process.env.AUTH_SERVICE_URL;

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: targetServiceUrl,
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
