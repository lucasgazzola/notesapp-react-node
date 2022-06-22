import './App.css';
import { AppContextProvider } from './context/AppContext';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';
import { NotesContextProvider } from './context/NotesContext';


export default function App() {

  return (
    <AppContextProvider>
      <NotesContextProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </NotesContextProvider>
    </AppContextProvider>
  );
}

