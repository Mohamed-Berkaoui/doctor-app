const express = require("express");
const connectToDb = require("./utils/connectToDb");
const reservationRouter = require("./routers/reservation");
const AppError = require("./utils/appError");
const userRouter = require("./routers/user");
const cors= require("cors");

const app = express();
app.use(cors())

app.use(express.json());

app.use("/api/auth", userRouter);

app.use("/api/reservations", reservationRouter);

app.all("*", function (req, res) {
  res.status(404).json(new AppError("404 not found"));
});

app.use(function (err, req, res, next) {
  res.status(500).json(new AppError(err.message));
});

app.listen(5000, function () {
  connectToDb();
  console.log("server runing on port 5000");
});
