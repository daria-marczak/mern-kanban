import Lane from '../models/lane';
import uuid from 'uuid';

export function addLane(req, res) {
  if (!req.body.name) {
    return res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}