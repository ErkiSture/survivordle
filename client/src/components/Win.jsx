import  '../styles/index.css'
import  '../styles/win.css'
import { useEffect, useState } from 'react'
import { GAME_SETTINGS } from '../scripts/config';


export default function WinOverlay({ guesses }) {
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="win-wrapper">
      <h2>Congrats!</h2>
      <div className='answer-text'>
        <div>Correct answer: {guesses[guesses.length - 1].guess}</div>
        <div>You got it in {guesses.length} guesses</div>
      </div>
      {/* <SymbolResult guesses={guesses}></SymbolResult> */}
      <div className='result-string'>{generateResultString(guesses)}</div>
      <CopyBtn guesses={guesses}></CopyBtn>
    </div>
  )
}


function CopyBtn({ guesses }) {
  const [text, setText] = useState("Copy")
    
  function handleClick() {
    setText("Copied")
    updateClipboard(generateCopyString(guesses))
  };
  
  function handleReset() {
    setText("Copy")
  }
  
  return (
    <button className='share-button' onClick={() => handleClick()} onBlur={() => handleReset()}>{text}</button>
  );
}


function generateResultString(guesses) {
  let result = ""
  guesses.forEach((guess) => {
    result += GAME_SETTINGS.columns
    .slice(1)
    .map((column => guess.result[column][0] ? "🟩" : "🟥"))
    .join("");
    result += "\n"
  })
  return result
}


function generateCopyString(guesses) {
  let result = `I played survivordle and got it in ${guesses.length} tries\n`
  result += generateResultString(guesses)
  return result
}


function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(
    () => {
      /* clipboard successfully set */
    },
    () => {
      /* clipboard write failed */
    },
  );
}