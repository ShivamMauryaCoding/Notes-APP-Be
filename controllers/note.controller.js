const express = require("express");
const notesModel = require("../models/notes.model");

module.exports.Createnotes = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({ message: "Title and content are required" });
  }
  try {
    const notes = new notesModel({ ...req.body, userId: req.user._id });
    await notes.save();
    res.status(201).send({ message: "Note created successfully" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error creating note", error: error.message });
  }
};

module.exports.DeleteNotes = async (req, res) => {
  try {
    const isexistnotes = await notesModel.findById(req.params.noteId);
    console.log(isexistnotes);
    if (!isexistnotes) {
      return res.status(404).send({ message: "Note not found" });
    }
    if (isexistnotes.userId !== req.user._id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete this note" });
    }
    await notesModel.findByIdAndDelete(req.params.noteId);
    res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {}
};

module.exports.GetallNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({ userId: req.user._id });
    res.status(200).send({ notes });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error fetching notes", error: error.message });
  }
};

module.exports.getsinglenote = async (req, res) => {
  try {
    const note = await notesModel.findById(req.params.noteId);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }
    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Unauthorized" });
    }
    res.status(200).send({ note });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};

module.exports.UpdateNotes = async (req, res) => {
  try {
    const isexistnotes = await notesModel.findById(req.params.noteId);
    if (!isexistnotes) {
      return res.status(404).send({ message: "Note not found" });
    }
    if (isexistnotes.userId !== req.user._id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this note" });
    }
    const updatedNote = await notesModel.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error updating note", error: error.message });
  }
};
