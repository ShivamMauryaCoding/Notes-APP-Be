const express = require("express");
const {
  Createnotes,

  DeleteNotes,
  UpdateNotes,
  GetallNotes,
  getsinglenote,
} = require("../controllers/note.controller");
const CheckAuth = require("../middleware/Auth");

const notesRouter = express.Router();

notesRouter.post("/createNotes", CheckAuth, Createnotes);

notesRouter.get("/getallNotes", CheckAuth, GetallNotes);

notesRouter.delete("/delete/:noteId", CheckAuth, DeleteNotes);

notesRouter.patch("/update/:noteId", CheckAuth, UpdateNotes);

notesRouter.get("/singlenote/:noteId", CheckAuth, getsinglenote);

module.exports = notesRouter;
