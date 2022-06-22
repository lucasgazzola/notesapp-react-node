import './Note.css';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import NoteControls from './NoteControls'
import { getAllCategoriesOnNote } from '../services/categoriesService';


export default function Note({ note }) {

  const { setIsVisible, setNoteInModal, setIsEditing } = useContext(AppContext)
  const { title, updatedAt, id } = note;

  const DATE = updatedAt?.slice(0, 10)
  const HOURS = updatedAt?.slice(11, 19)

  const [HOUR, MINUTES, SECONDS] = HOURS.split(':')
  const TIME_FORMAT = `${HOUR}:${MINUTES}:${SECONDS}`

  const [YEAR, MONTH, DAY] = DATE.split('-')
  const DATE_FORMAT = `${DAY}/${MONTH}/${YEAR}`




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
        <span className='Note--date'><p>Last edited:</p> {`${TIME_FORMAT} - ${DATE_FORMAT}`}</span>
      </div>
      <NoteControls note={note} />
    </div>
  )
}