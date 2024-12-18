import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import morgan from "morgan";
import postRoute from "./routes/postRoute.js";

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

connectDb();

// app.use('/',postRoute)
app.get("/", (req, res) => {
  res.send("post server is running");
});

app.listen(5001, () => {
  console.log("post Server is running on port 5001");
});
