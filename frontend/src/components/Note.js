import './Note.css';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import NoteControls from './NoteControls'
import { getAllCategoriesOnNote } from '../services/categoriesService';


export default function Note({ note }) {

  const { setIsVisible, setNoteInModal, setIsEditing } = useContext(AppContext)
  const { title, updatedAt, id } = note;

  const handleClick = async () => {
    setIsEditing(true);
    setIsVisible(true);
    await getAllCategoriesOnNote(id)
      .then((categories) => setNoteInModal({
        ...note,
        categories
      }))
  }

  return (
    <div
      onClick={handleClick}
      className='Note--container'
    >
      <div className='Note--content'>
        <h3>{title}</h3>
        <span className='Note--date'><p>Last edited:</p> {`${updatedAt}`}</span>
      </div>
      <NoteControls note={note} />
    </div>
  )
}