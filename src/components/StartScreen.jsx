import "./StartScreen.css"
import React from 'react'

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Clique no botão para começar o jogo</p>
      <button onClick={startGame}>COMEÇAR</button>
    </div>
  )
}

export default StartScreen