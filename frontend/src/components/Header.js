import './Header.css'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'


export default function Header() {
  const { setIsVisible, setNoteInModal, setIsEditing } = useContext(AppContext)


  const actualLocation = useLocation()
  const isArchived = actualLocation.pathname.includes('archived')

  const handleClick = () => {
    setIsEditing(false);
    setNoteInModal({
      title: '',
      content: '',
      categories: [],
    });
    setIsVisible(prevState => !prevState);
  }

  return (
    <div className="Header--container">
      {
        isArchived
          ? (
            <>
              <h1 className="Header--title">Archived</h1>
              <div className='Link--container'>
                <span>
                  <AiFillLeftCircle />
                </span>
                <Link to="/">Go back to My Notes</Link>
              </div>
            </>
          )
          : (
            <>
              <h1 className="Header--title">My Notes</h1>
              <button
                className='Header--button'
                type='button'
                onClick={handleClick}
              >
                Create Note
              </button>
              <div className='Link--container'>
                <Link to="/archived">To Archived Notes</Link>
                <span>
                  <AiFillRightCircle />
                </span>
              </div>
            </>
          )
      }
    </div>
  )
}