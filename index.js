const express = require("express");
const app = express();
const database = require("./config/database");
const useRouter = require("./routes/user.routes");
const noteRouter = require("./routes/notes.routes");
const cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", useRouter);
app.use("/api/notes", noteRouter);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  database();
  console.log(`Server Run On Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>This is first route of Notes App</h1>`);
});
