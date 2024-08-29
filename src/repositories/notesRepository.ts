import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las notas
export const findAllNotes = async () => {
  return await prisma.note.findMany({
    include: {
      categories: {
        select: {
          categoryName: true,
        },
      },
    },
  });
};

// Obtener una nota por ID
export const findNoteById = async (id: number) => {
  return await prisma.note.findFirst({
    where: { id },
    include: {
      categories: true,
    },
  });
};

// Eliminar una nota por ID
export const removeNote = async (id: number) => {
  await prisma.categoriesOnNotes.deleteMany({
    where: {
      noteId: id,
    },
  });

  return await prisma.note.delete({
    where: { id },
  });
};

// Crear una nueva nota
export const createNote = async (title: string, content: string) => {
  return await prisma.note.create({
    data: {
      title,
      content,
      isArchived: false,
      updatedAt: new Date().toISOString(),
    },
  });
};

// Buscar una categoría por nombre
export const findCategoryByName = async (categoryName: string) => {
  return await prisma.category.findFirst({
    where: {
      name: categoryName,
    },
  });
};

// Crear una nueva categoría
export const createCategory = async (categoryName: string) => {
  return await prisma.category.create({
    data: {
      name: categoryName,
    },
  });
};

// Vincular una nota con una categoría
export const linkNoteWithCategory = async (
  noteId: number,
  categoryName: string
) => {
  return await prisma.categoriesOnNotes.create({
    data: {
      noteId,
      categoryName,
    },
  });
};

// Obtener todas las categorías de una nota
export const findCategoriesByNoteId = async (noteId: number) => {
  const note = await prisma.note.findUnique({
    where: { id: noteId },
    include: {
      categories: true,
    },
  });

  return note?.categories;
};

// Actualizar una nota (título y contenido)
export const updateNoteDetails = async (
  noteId: number,
  title: string,
  content: string
) => {
  return await prisma.note.update({
    where: { id: noteId },
    data: {
      title,
      content,
    },
  });
};

// Eliminar todas las categorías vinculadas a una nota
export const removeAllCategoriesFromNote = async (noteId: number) => {
  return await prisma.categoriesOnNotes.deleteMany({
    where: {
      noteId,
    },
  });
};

// Alternar el estado de archivo de una nota
export const toggleNoteArchive = async (
  noteId: number,
  isArchived: boolean
) => {
  return await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      isArchived: !isArchived,
    },
  });
};

// Obtener todas las notas archivadas
export const findAllArchivedNotes = async () => {
  return await prisma.note.findMany({
    where: {
      isArchived: true,
    },
    include: {
      categories: {
        select: {
          categoryName: true,
        },
      },
    },
  });
};

// Obtener todas las categorías
export const findAllCategories = async () => {
  return await prisma.category.findMany({
    select: {
      name: true,
    },
  });
};

// Obtener las notas de una categoría específica
export const findNotesByCategory = async (categoryName: string) => {
  const notesInTheCategory = await prisma.categoriesOnNotes.findMany({
    where: { categoryName },
    select: { noteId: true },
  });

  return notesInTheCategory.map((note) => note.noteId);
};
