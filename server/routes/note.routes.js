import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

router.route('/notes').post(NoteController.addNote);

export default router;
