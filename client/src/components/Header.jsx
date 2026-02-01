import '../styles/header.css'
import { useContext, useState } from 'react'
import { ThemeContext } from './App'
import lightIcon from "../assets/lightModeBtnIcon.png";
import darkIcon from "../assets/darkModeBtnIcon.png";
import { ThemeBtn } from './ThemeBtn';
import { NextGameTimer } from './NextGameTimer';


export default function Header() {

  const theme = useContext(ThemeContext).theme;
  
  return (
    <header className={theme}>
      <div className='header-container'>

        <div className='left-header'>
          <div>Survivordle - Nr 1 game</div>
          <nav>
            <ul>
              {/* <li><a href="#">Survivordle</a></li> */}
              {/* <li><a href="#">Agentdle</a></li> */}
            </ul> 
          </nav>
        </div>

        <div className='right-header'>
          <ThemeBtn></ThemeBtn>          
          <NextGameTimer></NextGameTimer>
        </div>

      </div>
    </header>
  )
}


