const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const verifyToken = require("./middleware/verifyToken");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));
app.use(morgan("dev"));


const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth:5000';
const postServiceUrl = process.env.POST_SERVICE_URL || 'http://post:5001';

app.use(
  "/api/auth",
  createProxyMiddleware({
    target:authServiceUrl,
    changeOrigin: true,
    cookieDomainRewrite: "localhost", 
  })
);
app.use(
  "/api/post",
  createProxyMiddleware({
    target: postServiceUrl,
    changeOrigin: true,
    cookieDomainRewrite: "localhost", 
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
