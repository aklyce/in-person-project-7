import { createContext, useState, useContext, useEffect } from 'react';

// TODO: Create the ThemeContext using createContext()
const ThemeContext = createContext();

// Custom hook for using theme
export const useTheme = () => {
  // TODO: Get context using useContext
  const context = useContext(ThemeContext);
  // TODO: Add error handling if context is not found
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};

// Provider component
export const ThemeProvider = ({ children }) => {
  // TODO: Initialize theme state
    const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Hint: Check localStorage first, default to 'light'
  // const [theme, setTheme] = useState(() => {
  //   return localStorage.getItem('theme') || 'light';
  // });

  // TODO: Create a useEffect to:
  // 1. Set data-theme on the <html> element: document.documentElement.setAttribute('data-theme', theme)
  // 2. Save theme to localStorage
  // This should run whenever theme changes
  useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  }, [theme]);

  // TODO: Create toggleTheme function

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };  


  // TODO: Create the value object with theme and toggleTheme

  const value = {
    theme, 
    toggleTheme,
  };

  // TODO: Return the Provider with value and children
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};