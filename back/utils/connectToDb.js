const { default: mongoose } = require("mongoose");

function connectToDb() {
  const DB_URI =
    "mongodb+srv://admin:dxI2Z4fiz457GAwn@cluster0.n0tzw.mongodb.net/";

  mongoose
    .connect(DB_URI, { dbName: "integration" })
    .then(() => console.log("connected to db"))
    .catch((e) => console.error(e.message));
}

module.exports = connectToDb;
