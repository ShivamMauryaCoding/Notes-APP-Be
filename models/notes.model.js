const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  notesImage: {
    type: String,
    default:
      "https://png.pngtree.com/element_our/20190603/ourmid/pngtree-sticky-note-cartoon-illustration-image_1430615.jpg",
  },
});

const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
