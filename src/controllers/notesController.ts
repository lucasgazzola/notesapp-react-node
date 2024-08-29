import { Request, Response } from 'express';
import * as notesService from '../services/notesService';

// Obtener todas las notas
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await notesService.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get notes' });
  }
};

// Obtener una nota por ID
export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const note = await notesService.getNoteById(id);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get note' });
  }
};

// Crear una nueva nota
export const createNote = async (req: Request, res: Response) => {
  try {
    const note = await notesService.createNote(req.body);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// Eliminar una nota por ID
export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const deletedNote = await notesService.deleteNote(id);
    res.status(202).json(deletedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete note' });
  }
};

// Actualizar una nota por ID
export const updateNote = async (req: Request, res: Response) => {
  try {
    const { isClickArchived, ...rest } = req.body;

    if (isClickArchived) {
      await notesService.toggleArchiveNote(req.body);
    } else {
      await notesService.updateNote(rest);
    }

    res.status(200).json({ message: 'Note updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update note' });
  }
};

// Obtener todas las categorías de una nota
export const getAllCategoriesInTheNote = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const categories = await notesService.getAllCategoriesInTheNote(id);
    if (categories) {
      res.status(200).json(categories);
    } else {
      res.status(204).json({ message: 'No categories in the note' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get categories' });
  }
};

// Obtener todas las notas archivadas
export const getAllArchivedNotes = async (req: Request, res: Response) => {
  try {
    const notes = await notesService.getAllArchivedNotes();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get archived notes' });
  }
};

// Obtener todas las categorías
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await notesService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get categories' });
  }
};

// Obtener todas las notas de una categoría
export const getNotesOfTheCategory = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const notes = await notesService.getNotesOfTheCategory(name);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get notes for category' });
  }
};
