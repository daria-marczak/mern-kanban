import uuid from 'uuid';
import Note from '../models/note';
import Lane from '../models/lane';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.concat([saved]);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}