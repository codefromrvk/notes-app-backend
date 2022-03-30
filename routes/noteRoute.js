import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

router.post("/create", (req, res) => {
  const { title, content, completed } = { ...req.body };
  console.log(req.body);
  //   res.send("note route");
  const newNote = new Note({
    title,
    content,
    completed,
  });
  newNote.save();
});

router.get("/notes", (req, res) => {
  Note.find().then((foundNotes) => res.json(foundNotes));
});

router.delete("/delete:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete({ _id: id }, (err, note) => {
    if (err) {
      console.log(err);
    } else {
      console.log("item deleted");
    }
  });
});
router.put("/put:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body, id);
  Note.findByIdAndUpdate(
    { _id: id },
    { $set: { title: req.body.title, content: req.body.content } },
    (err, note) => {
      if (err) {
        console.log(err);
      } else {
        console.log("item deleted");
      }
    }
  );
});
router.put("/notes:id", async (req, res) => {
  const id = req.params.id;
  // console.log(req.body, id);
  let note = await Note.findById({ _id: id }).exec();
  console.log(note.completed);
  Note.findByIdAndUpdate(
    { _id: id },
    { $set: { completed: !note.completed } },
    (err, note) => {
      if (err) {
        console.log(err);
      } else {
        console.log("item completion changed", note);
      }
    }
  );
});

export default router;
