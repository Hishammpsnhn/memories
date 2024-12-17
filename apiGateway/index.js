const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const proxy = require("express-http-proxy");
require("dotenv").config();

const app = express();
app.use(cors())
app.use(morgan());
// Load service URLs from environment variables
const authServiceUrl = 'http://localhost:5000';
// const postServiceUrl = process.env.POST_SERVICE_URL;
console.log(authServiceUrl)
// Routes
// app.use(
//     "/api/auth",
//     createProxyMiddleware({
//       target: 'http://localhost:5000/login',
//       changeOrigin: true,
//     })
//   );
const targetServiceUrl = process.env.AUTH_SERVICE_URL; 
app.use('/auth', proxy(targetServiceUrl));
  

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});


// Start the server
const PORT =  4000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
