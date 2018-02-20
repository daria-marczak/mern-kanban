import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

router.route('/notes').post(NoteController.addNote);
router.route('/notes/:taskId').delete(NoteController.deleteNote);
router.route('/notes/:taskId').put(NoteController.renameNote);
export default router;
