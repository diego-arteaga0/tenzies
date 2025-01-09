import Die from "./components/Die"
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())

  const { width, height } = useWindowSize()

  const buttonRef = useRef(null)

  const gameWon = (dice.every(die => (die.value === dice[0].value && die.isHeld)))

  useEffect(() => {
    if(gameWon){
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice(){
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      }))
  }
  

  const diceElements = dice.map(die => 
    <Die 
      id={die.id}
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      hold={hold}  />
  
  )

  function rollDice(){
    if(!gameWon){setDice(oldDice => oldDice.map(
      die => die.isHeld ? die : 
      {...die, value: Math.ceil(Math.random() * 6) }
    ))}
    else {
      setDice(() => generateAllNewDice())
    }
  }

  function hold(id){
    setDice(prevDie => 
       prevDie.map(die => 
         (die.id===id ?
          {...die, isHeld: !die.isHeld}
          : die)
      )
    )
  }
  
  return (
    <main>
      {gameWon && <Confetti width={width} height={height} />}
      <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button ref={buttonRef} className="roll" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}
