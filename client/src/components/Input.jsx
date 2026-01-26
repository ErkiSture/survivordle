import { useEffect, useState } from "react"
import '../styles/input.css'

export default function Input({ submitHandler, gameOver, setInputText, inputText}) {
  
  const [survivorNames, setSurvivorNames] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [guessedSuggestions, setGuessedSuggestions] = useState(new Set())
  const [inputIsFocused, setInputIsFocused] = useState(false)

  // Load all survivor names into state
  useEffect(() => {
    fetch("/get_all_survivors")
      .then((res) => res.json())
      .then((data) => setSurvivorNames(data))
  }, [])

  function handleSuggestionClick(text){
    submitHandler(undefined, text);
    setSuggestions([])
    setInputText("");
    setGuessedSuggestions(new Set([...guessedSuggestions, text]))
  }

  return(
    <div className="input-wrapper"
      // Have suggestions disappear if onfocused
      onFocus={() => setInputIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setInputIsFocused(false)}
        }
      }>

      <form onSubmit={submitHandler} className="input-form">
        <input className="input-field" 
          value={inputText}
          type="text"
          placeholder="Type here..."
          // Update suggestion state list every time input field changes
          onChange={(e) => {
            setInputText(e.target.value);
            setSuggestions(getSuggestions(e.target.value, survivorNames, guessedSuggestions));
          }} 
          disabled={gameOver}/>
          
          {inputIsFocused && (
          <SuggestionsOverlay 
            handleSuggestionClick={handleSuggestionClick}
            suggestions={suggestions} 
            setSuggestions={setSuggestions}>
          </SuggestionsOverlay>
          )}
      </form>
    </div>
  )
}


function getSuggestions(inputText, survivorNames, guessedSuggestions) {
  if (!inputText){
    return [];
  }

  // Only return survivors with names matching input field that have not already been guessed
  return survivorNames.filter((name, index) => {
    // console.log(name.toLowerCase(), guessedSuggestions)
    return name.toLowerCase().startsWith(inputText.toLowerCase()) && !guessedSuggestions.has(name);
  })
}


function SuggestionsOverlay({ suggestions, handleSuggestionClick }) {
  // Create a suggestion for every suggestion in the state variable
  const suggestionFiles = suggestions.map((suggestion) => {
    return <Suggestion key={suggestion} text={suggestion} handleSuggestionClick={handleSuggestionClick}></Suggestion>
  })

  return(
   <ul className="suggestion-list">
    {suggestionFiles}
   </ul>
  )
}


function Suggestion({ text, handleSuggestionClick }) {
  return(
    <li className="suggestion">
      <button type="button" onClick={() =>handleSuggestionClick(text)}>
        {text}
      </button>
    </li>
  )
}