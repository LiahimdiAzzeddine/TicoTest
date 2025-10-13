import React, { createContext, useState, useContext } from "react";

// 1. Créer un contexte
const SelectedIndexContext = createContext();

// 2. Fournisseur global
export const SelectedIndexProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SelectedIndexContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </SelectedIndexContext.Provider>
  );
};

// 3. Hook pratique
export const useSelectedIndex = () => useContext(SelectedIndexContext);
