import { createContext } from "react";
import { Language, translations } from "./translations";

export { translations, type Language };

export const ThemeContext = createContext({ 
  isDarkMode: true, 
  toggleTheme: () => {},
  cursorColor: "#1cb0f6",
  setCursorColor: (color: string) => {} 
});

export const LanguageContext = createContext({
  language: "EN" as Language,
  setLanguage: (_: Language) => {},
  t: (key: string) => key,
});
