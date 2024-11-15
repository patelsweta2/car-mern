const express = require("express");
const ConnectDB = require("./src/config/db");
const userRoute = require("./src/router/userRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const carsRouter = require("./src/router/carRouter");

const app = express();

dotenv.config();
ConnectDB();

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//enable cors
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cors());

//routes
app.use("/api/users", userRoute);
app.use("/api/cars", carsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API server!");
});

//handle invalid routes
app.all("*", (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

//error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });
});

//server setup
const PORT = process.env.PORT || 8000;
const MODE = process.env.NODE_ENV || "production";
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${MODE}`);
});
