const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect("mongodb+srv://shivammauryavines:ctB7tqfUWsFD9NUz@cluster0.ydkwetv.mongodb.net/removieApp?retryWrites=true&w=majority&appName=Cluster0",{
        useNewUrlParser: true,
  useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection successfully");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = dbConnect;
