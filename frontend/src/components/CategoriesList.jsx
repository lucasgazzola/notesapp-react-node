import './CategoriesList.css'
import { useContext } from 'react'
import Category from './Category';
import AddNewCategory from './AddNewCategory';
import { AppContext } from '../context/AppContext';


export default function CategoriesList() {

  const { noteInModal } = useContext(AppContext)
  const { categories } = noteInModal

  return (
    <section className='Categories--section'>
      <div className='Categories--container'>
        {
          categories?.map(({ categoryName }) => (
            <Category name={categoryName} key={categoryName} />
          )
          )
        }
      </div>
      <AddNewCategory />
    </section>
  )
}