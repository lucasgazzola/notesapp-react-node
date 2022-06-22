import './NotesList.css'
import { useEffect, useContext } from 'react';
import { NotesContext } from '../context/NotesContext';
import { AppContext } from '../context/AppContext';
import { getAllNotes, getAllArchivedNotes } from '../services/notesService';
import Note from './Note';
import CategorySelector from '../components/CategorySelector';
import { useLocation } from 'react-router-dom';

export default function NotesList() {
  const actualLocation = useLocation();
  const isArchived = actualLocation.pathname.includes('archived');


  const { reFetch } = useContext(AppContext);

  const { notes, setNotes } = useContext(NotesContext);


  useEffect(() => {
    async function fetchNotes(isArchived) {
      if (isArchived) {
        await getAllArchivedNotes()
          .then((notesList) => setNotes(notesList?.filter(note => note.isArchived === true)))
          .catch(console.error)

      } else {
        await getAllNotes()
          .then((notesList) => setNotes(notesList?.filter(note => note.isArchived === false)))
          .catch(console.error)
      }
    }
    fetchNotes(isArchived)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArchived, actualLocation, reFetch])

  return (
    <div className='NotesList'>
      <header className='NotesList--title__container'>
        <h2 className='NotesList--title'>List of notes</h2>
        <CategorySelector />
      </header>
      <main className='NotesList--container'>
        {
          notes?.length !== 0
            ? notes?.map(note => {
              console.log(note)
              return <Note key={note.id} note={note} />
            })
            : <h3 className='NotesList--loading'>There aren't any notes in this category. <br /> You can create one by clicking the <span
              style={{
                color: '#3312d4',
                borderRadius: "10px",
                padding: "5px 6px",
                letterSpacing: "1px",
                backgroundColor: '#f4f4f4',
                fontWeight: '900'
              }}
            >
              Create Note</span> button
            </h3>
        }
      </main>
    </div>
  )
}