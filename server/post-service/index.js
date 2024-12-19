import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import morgan from "morgan";
import postRoute from "./routes/postRoute.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true, 
};

dotenv.config()
app.use(cookieParser());

// Apply CORS middleware to the API Gateway
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use('/',postRoute)
app.get("/", (req, res) => {
  res.send("post server is running");
});

app.listen(5001, () => {
  console.log("post Server is running on port 5001");
});
