import * as notesRepository from '../repositories/notesRepository';

export const getAllNotes = async () => {
  try {
    return await notesRepository.findAllNotes();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getNoteById = async (noteId: string) => {
  const id = Number(noteId);
  return await notesRepository.findNoteById(id);
};

export const deleteNote = async (idNote: string) => {
  const id = Number(idNote);
  return await notesRepository.removeNote(id);
};

export const createNote = async ({
  title,
  content,
  categories,
}: {
  title: string;
  content: string;
  categories: Array<{ categoryName: string }>;
}) => {
  const note = await notesRepository.createNote(title, content);
  const { id: noteId } = note;

  for (const category of categories) {
    const { categoryName } = category;

    try {
      let existsCategory = await notesRepository.findCategoryByName(
        categoryName
      );

      if (!existsCategory) {
        existsCategory = await notesRepository.createCategory(categoryName);
      }

      await notesRepository.linkNoteWithCategory(noteId, categoryName);
    } catch (e) {
      console.error(e);
    }
  }

  return note;
};

export const getAllCategoriesInTheNote = async (idNote: string) => {
  const id = Number(idNote);
  return await notesRepository.findCategoriesByNoteId(id);
};

export const toggleArchiveNote = async ({
  id,
  isArchived,
}: {
  id: string;
  isArchived: boolean;
}) => {
  const noteId = Number(id);
  return await notesRepository.toggleNoteArchive(noteId, isArchived);
};

export const updateNote = async ({
  id,
  title,
  content,
  categories,
}: {
  id: string;
  title: string;
  content: string;
  categories: Array<{ categoryName: string }>;
}) => {
  const noteId = Number(id);

  await notesRepository.removeAllCategoriesFromNote(noteId);

  const notes = await notesRepository.updateNoteDetails(noteId, title, content);

  for (const category of categories) {
    const { categoryName } = category;

    try {
      let existsCategory = await notesRepository.findCategoryByName(
        categoryName
      );

      if (!existsCategory) {
        existsCategory = await notesRepository.createCategory(categoryName);
      }

      await notesRepository.linkNoteWithCategory(noteId, categoryName);
    } catch (e) {
      console.error(e);
    }
  }

  return notes;
};

export const getAllArchivedNotes = async () => {
  return await notesRepository.findAllArchivedNotes();
};

export const getAllCategories = async () => {
  try {
    return await notesRepository.findAllCategories();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getNotesOfTheCategory = async (categoryName: string) => {
  const notesIdArray = await notesRepository.findNotesByCategory(categoryName);

  const notesPromiseArray = notesIdArray.map(async (noteId) => {
    return await notesRepository.findNoteById(noteId);
  });

  const data = await Promise.allSettled(notesPromiseArray);

  return data.map((note) => (note.status === 'fulfilled' ? note.value : null));
};
