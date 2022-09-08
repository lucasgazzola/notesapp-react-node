import React, { Suspense, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { NotesContext } from '../context/NotesContext'
import { AppContext } from '../context/AppContext'
import { getAllNotes, getAllArchivedNotes } from '../services/notesService'

import './NotesList.css'

const CategorySelector = React.lazy(() =>
  import('../components/CategorySelector')
)
const Note = React.lazy(() => import('../components/Note'))

export default function NotesList() {
  const actualLocation = useLocation()
  const isArchived = actualLocation.pathname.includes('archived')

  const { reFetch } = useContext(AppContext)

  const { notes, setNotes } = useContext(NotesContext)
  const { setIsVisible, setNoteInModal, setIsEditing } = useContext(AppContext)

  const handleClick = () => {
    setIsEditing(false)
    setNoteInModal({
      title: '',
      content: '',
      categories: [],
    })
    setIsVisible(prevState => !prevState)
  }

  useEffect(() => {
    async function fetchNotes(isArchived) {
      if (isArchived) {
        await getAllArchivedNotes()
          .then(notesList =>
            setNotes(notesList?.filter(note => note.isArchived === true))
          )
          .catch(console.error)
      } else {
        await getAllNotes()
          .then(notesList =>
            setNotes(notesList?.filter(note => note.isArchived === false))
          )
          .catch(console.error)
      }
    }
    fetchNotes(isArchived)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArchived, actualLocation, reFetch])

  return (
    <div className="NotesList">
      <header className="NotesList--title__container">
        <h2 className="NotesList--title">List of notes</h2>
        <Suspense fallback={<div>Loading categories..</div>}>
          <CategorySelector />
        </Suspense>
      </header>
      <main className="NotesList--container">
        {notes?.length !== 0 ? (
          notes?.map(note => {
            return (
              <Suspense fallback={<div>Loading note...</div>}>
                <Note key={note.id} note={note} />
              </Suspense>
            )
          })
        ) : (
          <h3 className="NotesList--loading">
            There aren't any notes in this category. <br /> You can create one
            by clicking the{' '}
            <span className="NotesList--loading--button" onClick={handleClick}>
              Create Note
            </span>{' '}
            button.
          </h3>
        )}
      </main>
    </div>
  )
}
