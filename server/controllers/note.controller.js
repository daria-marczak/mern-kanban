import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid/v4';

export function addNote(req, res) {
  if (!req.body.task) {
    return res.status(403).end();
  }

  const newNote = new Note(req.body);

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    Lane.findOne({ id: req.params.laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function renameNote(req, res) {
  Note.findOne({ id: req.params.taskId }).exec((err, note) => {
    if (err) {
      return res.status(500).send(err);
    }
    note.set({ task: req.body.task });
    note.save(() => {
      return res.status(200).end();
    });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.taskId }).exec((err, note) => {
    if (err) {
      return res.status(500).send(err);
    }

    note.remove(() => {
      return res.status(200).end();
    });
  });
}