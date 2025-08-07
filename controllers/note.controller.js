const { noteModel } = require("../models/note.model");

module.exports.createNote = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const notes = new noteModel({ ...req.body, user_id: req.user._id });
        await notes.save();
        res.status(200).json({ message: "Note created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.deleteNotes = async (req, res) => {

    try {
        const isExistNotes = await noteModel.findById(req.params.noteId)
        if (!isExistNotes) {
            return res.status(400).json({ message: "notes not found" });
        }
        if (isExistNotes.user_id !== req.user._id) {
            return res.status(400).json({ message: "unauthorized" });

        }

        await noteModel.findByIdAndDelete(req.params.noteId)
        res.status(200).json({ message: "notes deleted successfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllNotes = async (req, res) => {

    if (req.user._id !== req.params?.userId) {
        return res.status(400).json({ message: "unauthorized" });
    }

    try {
        const notes = await noteModel.find({ user_id: req.user._id });
        if (!(notes.length > 0)) {
            return res.status(400).json({ message: "notes not found" });
        }
        res.status(200).json({ notes });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.updateNote = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const isExistNotes = await noteModel.findById(req.params.noteId);
        if (!isExistNotes) {
            return res.status(400).json({ message: "notes not found" });
        }
        if (isExistNotes.user_id !== req.user._id) {
            return res.status(400).json({ message: "unauthorized" });
        }

        await noteModel.findByIdAndUpdate(req.params.noteId, { ...req.body, user_id: req.user._id });
        res.status(200).json({ message: "Note updated successfully" });
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

module.exports.getNoteById = async (req, res) => {
  try {
    const note = await noteModel.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
