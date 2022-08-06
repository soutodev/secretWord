import React from 'react'
import './GameOver.css'

const GameOver = ({returnHome}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={returnHome}>Reiniciar</button>
    </div>
  )
}

export default GameOver