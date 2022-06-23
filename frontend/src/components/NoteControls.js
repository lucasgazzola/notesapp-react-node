import './NoteControls.css'
import { BsFillArchiveFill } from 'react-icons/bs';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdUnarchive } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { updateNote, deleteNote } from '../services/notesService';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CONFIRM_MESSAGE = 'Are you sure you want to delete this note?'


export default function NoteControls({ note }) {

  const { setReFetch } = useContext(AppContext);

  const { id } = note;

  const currentLocation = useLocation();

  const archived = currentLocation.pathname === '/archived';

  function stopPropagation(e) {
    if (e && e.stopPropagation) e.stopPropagation();
  }

  const toggleArchive = async (e) => {
    stopPropagation(e)
    await updateNote({
      ...note,
      isClickArchived: true
    })
      .then(() => setReFetch(prevstate => !prevstate))
      .catch(console.error)

  }

  const handleDelete = async (e) => {
    stopPropagation(e)
    const confirmMessage = CONFIRM_MESSAGE
    const areYouSure = window.confirm(confirmMessage)
    if (areYouSure) {
      await deleteNote(id)
        .then(() => setReFetch(prevstate => !prevstate))
        .catch(console.error)
    } else {
      return
    }
  }

  return (
    <div className='NoteControls--container'>

      <span
        onClick={toggleArchive} className='NoteControls--item'>
        {
          !archived
            ? <BsFillArchiveFill />
            : <MdUnarchive />
        }
      </span>
      <span
        className='NoteControls--item'><AiFillEdit />
      </span>
      <span
        onClick={handleDelete} className='NoteControls--item'><AiFillDelete />
      </span>
    </div>
  )
}
