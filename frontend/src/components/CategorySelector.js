import './CategorySelector.css';
import { getAllCategories, getNotesOfCategory } from '../services/categoriesService';
import { getAllNotes } from '../services/notesService'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';
import { AppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';


export default function CategorySelector() {
  const [categories, setCategories] = useState([]);

  const [selectedOption, setSelectedOption] = useState('alloptiondefault');

  const currentLocation = useLocation();
  const isArchived = currentLocation.pathname.includes('archived');

  const { setNotes, notes } = useContext(NotesContext);
  const { reFetch } = useContext(AppContext);

  useEffect(() => {
    setSelectedOption('alloptiondefault');
  }, [currentLocation])

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(console.error)
  }, [reFetch, isArchived, notes])

  const handleSelectChange = async (e) => {
    const categoryName = e.target.value;
    setSelectedOption(categoryName);
    if (categoryName === 'alloptiondefault') {
      await getAllNotes()
        .then(notes => setNotes(notes?.filter(note => note.isArchived === isArchived)))
        .catch(console.error)
    } else {
      await getNotesOfCategory(categoryName)
        .then(notes => setNotes(notes?.filter(note => note.isArchived === isArchived)))
        .catch(console.error)
    }
  }

  return (
    <div className='CategorySelector--container'>
      <select
        className='CategorySelector'
        name='categoryselector'
        placeholder='Select a category'
        title='Select a category'
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option
          key='alloptiondefault'
          value='alloptiondefault'
          defaultValue={true}
        >
          All
        </option>
        {
          categories?.map(({ name }) => (
            <option
              className='CategorySelector--option'
              key={name}
              value={name}
            >
              {name}
            </option>
          ))
        }
      </select>
    </div>
  )
}