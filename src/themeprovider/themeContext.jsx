import React, { createContext, useState,useRef } from "react";

const ThemeContext = createContext();

const ModeProvider = ({ children }) => {
    const [mode, setMode] = useState("light"); 
    const useData = useRef([]);
    const[aiData,setaiData]=useState([]);
    const[htmlData,sethtmlData]=useState([]);
    const cardRef = useRef(null); 
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')); // Toggle between light and dark
      };
    
    return (
        <ThemeContext.Provider value={{ mode, setMode,toggleTheme,useData,aiData,setaiData ,htmlData,sethtmlData,cardRef}}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ModeProvider };
