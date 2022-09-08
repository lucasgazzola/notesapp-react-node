import './Modal.css'
import CategoriesList from './CategoriesList'
import ModalButtons from './ModalButtons'
import { useAppContext } from '../context/AppContext'
import { useEffect, useRef } from 'react'

export default function Modal() {
  const { isVisible, noteInModal, setNoteInModal, isEditing } = useAppContext()
  const titleInputRef = useRef(null)

  useEffect(() => {
    if (isVisible) {
      titleInputRef.current && titleInputRef.current.focus()
    }
  }, [isVisible])

  const handleTitleChange = e => {
    setNoteInModal({
      ...noteInModal,
      title: e.target.value,
    })
  }

  const handleContentChange = e => {
    setNoteInModal({
      ...noteInModal,
      content: e.target.value,
    })
  }

  return (
    <div
      className={`
      Modal--container 
      ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="Modal--content">
        <h2>{isEditing ? 'Edit' : 'Create'} Note</h2>
        <form className="Form--container">
          <input
            onChange={handleTitleChange}
            autoComplete="off"
            required
            ref={titleInputRef}
            value={noteInModal.title || ''}
            type="text"
            placeholder="Title"
          />
          <textarea
            onChange={handleContentChange}
            autoComplete="off"
            required
            value={noteInModal.content || ''}
            type="text"
            placeholder="Content"
          />
          <CategoriesList />
          <ModalButtons />
        </form>
      </div>
    </div>
  )
}
