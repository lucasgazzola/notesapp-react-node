import './Note.css';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import NoteControls from './NoteControls'
import { getAllCategoriesOnNote } from '../services/categoriesService';


export default function Note({ note }) {

  const { setIsVisible, setNoteInModal, setIsEditing } = useContext(AppContext)
  const { title, updatedAt, id } = note;

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  // const OFFSET = new Date().getTimezoneOffset() / 60;
  // console.log(date)
  // const DATE = updatedAt?.slice(0, 10)
  // const HOURS = updatedAt?.slice(11, 19)

  // const [HOUR, MINUTES, SECONDS] = HOURS.split(':')
  // console.log(HOUR - OFFSET)
  // const TIME_FORMAT = `${HOUR - OFFSET}:${MINUTES}:${SECONDS}`

  // const [YEAR, MONTH, DAY] = DATE.split('-')
  // const DATE_FORMAT = `${DAY}/${MONTH}/${YEAR}`


  // Buenos Aires Timezone
  const DATE = new Date(updatedAt).toLocaleString({ timeZone });

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
        <span className='Note--date'><p>Last edited:</p> {`${DATE}`}</span>
      </div>
      <NoteControls note={note} />
    </div>
  )
}