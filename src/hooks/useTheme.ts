import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const [cursorColor, setCursorColor] = useState("#1cb0f6");

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.body.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggleTheme,
    cursorColor,
    setCursorColor
  };
}