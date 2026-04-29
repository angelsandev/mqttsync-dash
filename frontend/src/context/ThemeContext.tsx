// src/context/ThemeContext.tsx
import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Inicializar estado del Theme viendo lo que hay en localstorage
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' ? true : false;

    });

    // Si cambia DarkMode => añadir o quitar la clase .dark del HTML
useEffect(() => {
    if (darkMode) {
        console.log("¿Es modo oscuro?:", darkMode);
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        console.log("ELSE: ¿Es modo oscuro?:", darkMode);
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}, [darkMode]); // useEffect slo se ejecuta cuando cambia darkMode

// Función para cambiar el TEMA dark-light
const toogleDarkMode = () => setDarkMode(!darkMode);

return(
    <ThemeContext.Provider value={{darkMode, toogleDarkMode}}>
        {children}
    </ThemeContext.Provider>
);
};// end ThemeProvider


