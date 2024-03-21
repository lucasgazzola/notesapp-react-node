import './ModalButtons.css'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { setNewNote, updateNote } from '../services/notesService'

export default function ModalButtons() {
  const {
    setIsVisible,
    noteInModal,
    setNoteInModal,
    isEditing,
    setCategoryName,
    setReFetch,
  } = useContext(AppContext)

  const { title, content } = noteInModal

  const emptyNote = async () => {
    await setNoteInModal({
      title: '',
      content: '',
      categories: [],
    })
    await setCategoryName('')
  }

  const handleSave = () => {
    if (title === '' || content === '') {
      alert('You cannot save empty fields')
      return
    }
    if (isEditing) {
      updateNote({
        ...noteInModal,
        isClickArchived: false,
      }).then(() => setReFetch(prevstate => !prevstate))
    } else {
      setNewNote(noteInModal).then(() => setReFetch(prevstate => !prevstate))
    }
    emptyNote()
    setIsVisible(false)
  }

  const handleCancel = () => {
    emptyNote()
    setCategoryName('')
    setIsVisible(false)
  }

  return (
    <div className="ModalButtons--container">
      <button
        onClick={handleSave}
        className="ModalButtons--button"
        type="button">
        Save
      </button>
      <button
        onClick={handleCancel}
        className="ModalButtons--button"
        type="button">
        Cancel
      </button>
    </div>
  )
}
