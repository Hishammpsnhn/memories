import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:4000'
}));

app.use(morgan('dev'));


app.use(cookieParser());
// connectDb();



// Default route
app.get("/", (req, res) => {
  res.send("Hello World - auth service");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
