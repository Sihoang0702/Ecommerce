import express, { urlencoded } from "express";
import dotenv from "dotenv";
import dbConnect from "./src/config/connection.js";
import initRoutes from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8101;

//đọc được cookie
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true, //để có thể thêm data vào cookie trên chrome
  })
);
dbConnect();
initRoutes(app);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
