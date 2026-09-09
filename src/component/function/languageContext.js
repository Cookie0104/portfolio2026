
import { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("Chinese");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 給子元件使用的 Hook
export const useLanguage = () => useContext(LanguageContext);