import { useEffect, useState } from 'react';
import { getGuessResult, isCorrectGuess } from '../scripts/guess';
import Input from './Input'
import '../styles/game.css'
import  '../styles/index.css'
import { title } from '../scripts/helper';
import { GAME_SETTINGS } from '../scripts/config';
import WinOverlay from './Win';


export default function Game() {

  const [inputText, setInputText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [dailySurvivor, setDailySurvivor] = useState(null)
  const [show, setShow] = useState(false);
  
  // Call backend and set the daily survivor
  useEffect(() => {
    fetch("http://127.0.0.1:5000/daily_survivor")
    .then((res) => res.json())
    .then((json) => setDailySurvivor(json));
  }, [])
  
  // Makes the win-component appear delayed
  useEffect(() => {
    if (!gameOver) return;
    const id = setTimeout(() => setShow(true), GAME_SETTINGS.animationDelay*GAME_SETTINGS.columns.length*1000); // ms
    return () => clearTimeout(id);
  }, [gameOver]);

  // This function is called by tile and "submits" the guess
  async function submitHandler(e, name) {
    if (e) e.preventDefault();
    const guess = name ?? inputText

    if (!guess) return;
    const result = await getGuessResult(guess, dailySurvivor["stats"]);

    if (!result) return;
    setGuesses([...guesses, {guess, result}]);
    
    if (isCorrectGuess(result)) {
      setGameOver(true)
    }
  }
  
  return (
    <div className='game'>
      <h1>Guess a survivor</h1>
      <Input 
        submitHandler={submitHandler} 
        gameOver={gameOver} 
        setInputText={setInputText}
        inputText={inputText}>
      </Input>
      <Board guesses={guesses}></Board>

      {/* Render after a delay(when show is true) */}
      {gameOver && show &&(
        <WinOverlay guesses={guesses}></WinOverlay>
      )}
    </div>
  )
}


function Board({ guesses }) {
  const rows = guesses.map((guess, index) => {
    return <Row key={index} guessObj={guess}></Row>
  })

  return (
    <div className='board'>
      <RowColNames></RowColNames>
      {rows}
    </div>
  )
}


function Row({ guessObj }) {
  const tiles = GAME_SETTINGS.columns.slice(1).map((column, index) => {
    const correct = guessObj.result[column][0];
    const text = guessObj.result[column][1];
    return <GameTile key={column} text={text} correct={correct} index={index}></GameTile>
  })
  
  return (
    <div className='row'> 
      <StaticTile text={guessObj.guess}></StaticTile>
      {tiles}
    </div>
  )
}


function RowColNames() {
  const tileTitles = GAME_SETTINGS.columns.slice(1).map((column, index) => {
    return <StaticTile key={column} text={column}></StaticTile>
  }) 
  
  return (
    <div className='row'>
      <StaticTile text={GAME_SETTINGS.columns[0]}></StaticTile>
      {tileTitles}
    </div>
  )
}


function StaticTile({ text }) {
  return (
    <div className="tile">
      {title(text)}
    </div>
  )
}


function GameTile({ text, correct, index }) {
  var tileClasses = "tile game-tile"

  if (correct !== undefined){
    if (correct) {
      tileClasses += " correct"
    } else {
      tileClasses += " incorrect"
    }
  }

  return (
    <div className={tileClasses} style={{ animationDelay: `${index * GAME_SETTINGS.animationDelay}s` }}>
      {title(text)}
    </div>
  )
}