import { createContext, useState } from 'react';

export const NotesContext = createContext();

export function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const contextValue = {
    notes,
    setNotes
  };


  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
}