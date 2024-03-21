import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppContextProvider } from './context/AppContext';
import { NotesContextProvider } from './context/NotesContext';

import './App.css';

const Home = React.lazy(() => import('./pages/Home'));

export default function App() {
  return (
    <AppContextProvider>
      <NotesContextProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading Home Screen...</div>}>
            <Home />
          </Suspense>
        </BrowserRouter>
      </NotesContextProvider>
    </AppContextProvider>
  );
}
