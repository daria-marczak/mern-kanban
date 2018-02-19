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
      return res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ lanes });
  });
}



export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      return res.status(500).send(err);
    }

    lane.remove(() => {
      return res.status(200).end();
    });
  });
}

export function renameLane(req, res) {
  Lane.findOne( {id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      return res.status(500).send(err);
    }

    lane.set({ name: req.body.name });
    lane.save(() => {
      return res.status(200).end();
    });
  });
}