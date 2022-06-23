import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const app = express();

const PORT = process.env.PORT || 5000;
const NOTES_URL = '/api/notes';
const NOTES_URL_BY_ID = `${NOTES_URL}/:id`;

const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());


// TODO: Add all the try catch blocks


// GET ALL NOTES
// WORKING!
async function getAllNotes() {
  try{
    const notes = await prisma.note.findMany({
      include : {
        categories: {
          select: {
            categoryName: true
          }
        }
      }
    });
    console.log('GETTINGALLNOTES');
    console.log(notes);
    return notes;
  } catch(e){
    console.log(e);
    return [];
  }
}

app.get(NOTES_URL, async (req: express.Request, res: express.Response) => {
  const notes = await getAllNotes();
  res.status(200).json(notes);
});


// GET NOTE BY ID
// WORKING!
async function getNoteById(noteId: string) {
  const id = Number(noteId);
  const note = await prisma.note.findFirst({
    where: {
      id
    },
    include: {
      categories: true
    }
  });
  return note;
}
app.get(NOTES_URL_BY_ID, async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const note = await getNoteById(id);
  note 
    ?
    res.json(note).status(200)
    :  
    res.status(204);
});


// ELIMINAR NOTE BY ID
// WORKING!
async function deleteNote(idNote: string){
  const id = Number(idNote);

  await prisma.categoriesOnNotes.deleteMany({
    where: {
      noteId: id
    }
  });

  const note = await prisma.note.delete({
    where: {id},
  });
  console.log(note);
  
  return note;
}

app.delete(NOTES_URL, async(req: express.Request, res: express.Response) => {
  const {body} = req;
  const {id} = body;
  const deleted = await deleteNote(id);
  res.status(202).json(deleted);
});


// CREATE NEW NOTE
// WORKING!
async function setNewNote({title, content, categories}
  : {title: string, content: string, categories: Array<{categoryName: string}>}){
  // Creo la nueva nota
  const note = await prisma.note.create({
    data: {
      title,
      content,
      isArchived: false,
      updatedAt: new Date().toISOString()
    }
  });

  const {id: noteId} = note;

  // Recorro el array de categrorías
  categories.forEach(async (category) => {
    const {categoryName} = category;
    try{
      // Me fijo si cada categoría ya existe
      const existsCategory = await prisma.category.findFirst({
        where: {
          name: categoryName
        }
      });


      // Si la categoría no existe, la creo
      if (!existsCategory){
        const categoryCreated = await prisma.category.create({
          data: {
            name: categoryName,
          }
        });
        console.log(categoryCreated);
      }
      
      // Vinculo cada nueva categoría creada con la nota
      const categoriesOnNotes = await prisma.categoriesOnNotes.create({
        data: {
          noteId,
          categoryName,
        }
      });
      console.log(categoriesOnNotes);
    } catch(e){
      console.error(e);
    }
  });
  console.log(note);
  return note;
}
app.post(NOTES_URL, async(req: express.Request, res: express.Response) => {
  const {body} = req;
  const note = await setNewNote(body);
  res.status(201).json(note);
});


// GET CATEGORIES OF NOTE
// WORKING!
async function getAllCategoriesInTheNote(idNote: string) {
  const id = Number(idNote);
  const categoriesOnNotes = await prisma.note.findUnique({
    where: {
      id
    }, 
    include: {
      categories: true
    }
  });
  return (categoriesOnNotes?.categories);
}
app.get(`${NOTES_URL_BY_ID}/categories`,async(req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const categories = await getAllCategoriesInTheNote(id);
  if (!categories){
    res.status(204).json({message: 'No categories in the note'});
  }
  res.status(200).json(categories);
});


// UPDATE NOTE BY ID
// WORKING!
async function toggleArchiveNote({id, isArchived}: {id: string, isArchived: boolean}){
  console.log(id);
  const noteId = Number(id);
  const notes = await prisma.note.update({
    where: {
      id: noteId
    },
    data:{
      isArchived: !isArchived
    }
  });
  console.log(notes);
}
async function updateNote({id, title, content, categories }: {id: string, title: string, content: string, categories: Array<{categoryName: string}>}) {
  const noteId = Number(id);

  // Eliminar categorias de la nota
  const deletedCategoriesOnNotes = await prisma.categoriesOnNotes.deleteMany({
    where: {
      noteId
    }
  });
  console.log(deletedCategoriesOnNotes);


  // Actualizo la nota 
  const notes = await prisma.note.update({
    where: {
      id: noteId
    },
    data: {
      title,
      content
    }
  });
  console.log(notes);

  
  // Vinculo la nota con las nuevas categorías
  categories?.forEach(async (category) => {
    const {categoryName} = category;
    try{
      const existsCategory = await prisma.category.findFirst({
        where: {
          name: categoryName,
        },
        select: {
          name: true
        },
        rejectOnNotFound: false
      });
      
      console.log(existsCategory);
      // Si la categoría encontrada no existe, la creo
      if(!existsCategory){
        const newCategory = await prisma.category.create({
          data: {
            name: categoryName
          }
        });
        console.log(newCategory);
      }

      // Creo el vínculo entre la nota y la categoría
      const newCategoryOnNote = await prisma.categoriesOnNotes.create({
        data: {
          noteId,
          categoryName
        }
      });
      console.log(newCategoryOnNote);
  
    } catch(e){
      console.error(e);
    }
  });
}
app.put(NOTES_URL, async (req: express.Request, res: express.Response)=> {
  const {body} = req;
  const {isClickArchived} = body;

  if(isClickArchived){
    await toggleArchiveNote(body);
  }else{
    await updateNote(body);
  }
  res.status(200).json({message: 'Note updated'});
});


async function getAllArchivedNotes(){
  const notes = await prisma.note.findMany({
    where: {
      isArchived: true
    },
    include : {
      categories: {
        select: {
          categoryName: true
        }
      }
    }
  });
  
  return notes;
}

app.get('/api/archived', async (req: express.Request, res: express.Response)=>{
  const notes = await getAllArchivedNotes();
  res.status(200).json(notes);
});


// GET ALL CATEGORIES


async function getAllCategories(){
  try{
    const categories = await prisma.category.findMany({
      select: {
        name: true
      }
    });
    return categories;
  } catch(e){
    console.error(e);
    return [];
  }
}

app.get('/api/categories', async(req: express.Request, res: express.Response) => {
  const categories = await getAllCategories() ;
  console.log(categories);
  res.status(200).json(categories);
});



// GET ALL NOTES OF CERTAIN CATEGORY

async function getNotesOfTheCategory(categoryName: string){

  const notesInTheCategory = await prisma.categoriesOnNotes.findMany({
    where: {
      categoryName
    },
    select: {
      noteId: true
    }
  });
  
  const notesIdArray = notesInTheCategory.map(note => note.noteId);

  const notesPromiseArray = await notesIdArray.map(async (noteId)=>{
    const note = await prisma.note.findFirst({
      where: {
        id: noteId
      },
      include: {
        categories: true
      }
    });
    return note;  
  });
  const data = await Promise.allSettled(notesPromiseArray);
  const notes = data.map(note => note.status === 'fulfilled' ? note.value : null);
  return notes;
}


app.get('/api/categories/:name/notes', async(req: express.Request, res: express.Response) => {
  const {name} = req.params;
  const notes = await getNotesOfTheCategory(name);
  res.status(200).json(notes);
});



app.use(express.static(path.join(__dirname, '/frontend/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});



// PORT LISTENING
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});