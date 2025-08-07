const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user_id: {type: String, required: true },
    created_at: { type: Date, default: Date.now },
})

module.exports.noteModel = mongoose.model('note', noteSchema);