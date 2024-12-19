import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";
const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Allow the front-end to make requests
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  credentials: true, // Allow cookies to be sent with requests
};

// Apply CORS middleware to the API Gateway
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
connectDb();

app.use("/", authRoute);
app.get("/", (req, res) => {
  res.send("Hello from auth service");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
