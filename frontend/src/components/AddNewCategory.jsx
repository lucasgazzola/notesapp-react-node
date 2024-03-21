import './AddNewCategory.css';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

export default function AddNewCategory() {

  const {
    setNoteInModal,
    noteInModal,
    categoryName,
    setCategoryName
  } = useContext(AppContext)

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (categoryName === '') {
      alert('You cannot add empty categories')
      return;
    }
    if (noteInModal.categories?.find(category => category.categoryName === categoryName)) {
      setCategoryName('')
      alert('Category already exists')
      return;
    }
    await setNoteInModal({
      ...noteInModal,
      categories: noteInModal.categories.concat({ categoryName })
    })

    setCategoryName('')
  }

  const handleChange = ({ target }) => {
    const { value } = target;
    setCategoryName(value)
  }

  return (
    <div className='AddNewCategory--container'>
      <input
        value={categoryName}
        onChange={handleChange}
        type='text'
        placeholder='New category'
      />
      <button
        type='submit'
        onClick={handleAddCategory}
      >
        Add
      </button>
    </div>
  )
}