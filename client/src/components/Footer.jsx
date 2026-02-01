import { useContext } from 'react'
import '../styles/footer.css'
import { ThemeContext } from './App'


export default function Footer() {

  const {theme, setTheme} = useContext(ThemeContext)

  return (
    <footer className={theme}>
      <div className="footer-container">
        <div>Survivordle - 2026</div>
        <a href="https://gurka.se/" target="_blank">Gurka</a>
        <a href="https://vecka.nu/" target="_blank">Vecka</a>
      </div>
    </footer>
  )
}