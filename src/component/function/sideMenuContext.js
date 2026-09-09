import { createContext, useState } from "react";

export const SideMenuContext = createContext();

export const SideMenuProvider = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <SideMenuContext.Provider value={{ isSideMenuOpen, setIsSideMenuOpen }}>
      {children}
    </SideMenuContext.Provider>
  );
};