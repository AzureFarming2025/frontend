import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  currentTheme: 'light',
  changeCurrentTheme: () => {},
});

export default function ThemeProvider({children}) {  
  // Always use light theme - ignore localStorage
  const [theme, setTheme] = useState('light');

  const changeCurrentTheme = (newTheme) => {
    // Force light theme only
    setTheme('light');
    localStorage.setItem('theme', 'light');
  };

  useEffect(() => {
    document.documentElement.classList.add('**:transition-none!');
    // Always set light theme
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
    // Force DaisyUI light theme
    document.documentElement.setAttribute('data-theme', 'light');

    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('**:transition-none!');
    }, 1);
    
    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  return <ThemeContext.Provider value={{ currentTheme: 'light', changeCurrentTheme }}>{children}</ThemeContext.Provider>;
}

export const useThemeProvider = () => useContext(ThemeContext);