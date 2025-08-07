const mongoose = require("mongoose");

async function ConnectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://shivammauryavines:ctB7tqfUWsFD9NUz@cluster0.ydkwetv.mongodb.net/notesApp?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = ConnectDB;
