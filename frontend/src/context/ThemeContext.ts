// src/context/ThemeContext.ts
import { createContext } from 'react';

// Definir qué datos se van a compartir en este Contexto
export interface ThemeContextType {
    darkMode: boolean;
    toogleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
