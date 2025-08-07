const express = require('express');
const noteController = require('../controllers/note.controller');
const CheckAuth = require('../middlewares/Auth');

const noteRouter = express.Router();

noteRouter.post("/create", CheckAuth, noteController.createNote);
noteRouter.delete("/delete/:noteId",CheckAuth, noteController.deleteNotes);
noteRouter.get("/getAllnotes/:userId",CheckAuth, noteController.getAllNotes);
noteRouter.put("/update/:noteId", CheckAuth, noteController.updateNote);
noteRouter.get("/description/:noteId", CheckAuth, noteController.getNoteById);
noteRouter.get("/:noteId", CheckAuth, noteController.getNoteById);


module.exports = noteRouter;