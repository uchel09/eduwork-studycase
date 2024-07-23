import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dbConnection();
const app = express();

app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"];
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  // res.header("Referrer-Policy", "no-referrer-when-downgrade");

  next();
});

allRoutes(app);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port `, PORT);
});
