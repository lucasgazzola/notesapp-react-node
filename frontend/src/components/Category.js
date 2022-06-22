import './Category.css'
import { AiFillDelete } from 'react-icons/ai';
import { MdLabelImportant } from 'react-icons/md';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';


export default function Category({ name }) {

  const { noteInModal, setNoteInModal } = useContext(AppContext);

  const handleDeleteCategory = () => {
    setNoteInModal({
      ...noteInModal,
      categories: noteInModal.categories.filter(category => category.categoryName !== name)
    });
  }

  return (
    <div className="Category--container">
      <span className="Icon--container">
        <MdLabelImportant />
      </span>
      <span className="Name--container">
        {name}
      </span>
      <span
        onClick={handleDeleteCategory}
        className="DeleteButton--container"
      >
        <AiFillDelete />
      </span>
    </div >
  )
}