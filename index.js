const express = require("express");
const ConnectDB = require("./db/db");
const userRouter = require("./routers/user.route");
var cookieParser = require("cookie-parser");
const noteRouter = require("./routers/note.route");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);

app.listen(https://notes-app-be-5oau.onrender.com, async () => {
  try {
    await ConnectDB();
    console.log("Server is running on http://localhost:8080");
  } catch (error) {
    console.error("Error starting server:", error);
  }
});
