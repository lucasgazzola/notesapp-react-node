import Select from 'react-select';
import './CategorySelector.css';
import {
  getAllCategories,
  getNotesOfCategory,
} from '../services/categoriesService';
import { getAllNotes } from '../services/notesService';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';
import { AppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

export default function CategorySelector() {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState('alloptiondefault');
  const [options, setOptions] = useState([]);
  const currentLocation = useLocation();
  const isArchived = currentLocation.pathname.includes('archived');
  const { setNotes, notes } = useContext(NotesContext);
  const { reFetch } = useContext(AppContext);

  useEffect(() => {
    setSelectedOption('alloptiondefault');
  }, [currentLocation]);

  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
  }, [reFetch, isArchived, notes]);

  useEffect(() => {
    setOptions([
      { value: 'alloptiondefault', label: 'All' },
      ...categories.map(({ name }) => ({
        value: name,
        // First letter to UpperCase
        label: name.charAt(0).toUpperCase() + name.slice(1),
      })),
    ]);
  }, [categories]);

  const handleSelectChange = async (e) => {
    const categoryName = e?.value;
    setSelectedOption(categoryName);
    if (categoryName === 'alloptiondefault') {
      await getAllNotes()
        .then((notes) =>
          setNotes(notes?.filter((note) => note.isArchived === isArchived))
        )
        .catch(console.error);
    } else {
      await getNotesOfCategory(categoryName)
        .then((notes) =>
          setNotes(notes?.filter((note) => note.isArchived === isArchived))
        )
        .catch(console.error);
    }
  };

  return (
    <>
      {/* //TODO: implement multiselection */}
      {options && (
        <Select
          onChange={handleSelectChange}
          defaultValue={selectedOption}
          options={options}
          className="CategorySelector"
        />
      )}
    </>
  );
}
