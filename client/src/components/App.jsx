import Game from './Game.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { useState, createContext, useEffect } from 'react'


export const ThemeContext = createContext()


export default function App() {
  return(
    <>
    <ThemeProvider>
      <Header></Header>
      <Game></Game>
      <Footer></Footer>
    </ThemeProvider>
    </>      
  );
}


function ThemeProvider({ children }) {

  const [theme, setTheme] = useState("dark")
  
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  );
}