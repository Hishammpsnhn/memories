const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(morgan());

const authServiceUrl = process.env.AUTH_SERVICE_URL;
const postServiceUrl = process.env.POST_SERVICE_URL;

app.use(
  "/api/auth",
  createProxyMiddleware({
    target:authServiceUrl,
    changeOrigin: true,
  })
);
app.use(
  "/api/post",
  createProxyMiddleware({
    target: postServiceUrl,
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
