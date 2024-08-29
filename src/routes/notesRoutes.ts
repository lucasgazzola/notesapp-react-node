import express from 'express';
import * as notesController from '../controllers/notesController';

const router = express.Router();

router.get('/notes', notesController.getAllNotes);
router.get('/notes/:id', notesController.getNoteById);
router.post('/notes', notesController.createNote);
router.delete('/notes', notesController.deleteNote);
router.put('/notes', notesController.updateNote);
router.get('/notes/:id/categories', notesController.getAllCategoriesInTheNote);
router.get('/archived', notesController.getAllArchivedNotes);
router.get('/categories', notesController.getAllCategories);
router.get('/categories/:name/notes', notesController.getNotesOfTheCategory);

export default router;
