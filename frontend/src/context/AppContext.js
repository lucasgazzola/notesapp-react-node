import { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppContextProvider({ children }) {

  const [isEditing, setIsEditing] = useState(false);

  const [noteInModal, setNoteInModal] = useState({});

  const [isVisible, setIsVisible] = useState(false);

  const [reFetch, setReFetch] = useState(false);

  const [categoryName, setCategoryName] = useState('')

  const contextValue = {
    reFetch,
    setReFetch,
    categoryName,
    setCategoryName,
    isVisible,
    setIsVisible,
    noteInModal,
    setNoteInModal,
    isEditing,
    setIsEditing,
  };


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}