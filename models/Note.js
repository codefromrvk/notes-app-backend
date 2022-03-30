import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  title: String,
  content: String,
  completed: Boolean,
});

const Note = mongoose.model("Note", notesSchema);

export default Note;
