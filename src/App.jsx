//HOOKS
import { useCallback, useState, useEffect } from 'react'

//COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

//CSS
import './App.css'

//DATA
import { wordsList } from './data/words'

const stages = [
  { id:1,  name:"start" },
  { id:2,  name:"game"  },
  { id:3,  name:"end" },
]

const guessesQty = 3;

function App() {


  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(50)


  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //console.log(category);

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    //console.log(word);

    return {word, category};
  }

  // starts the secret word game
  const startGame = () => {
    //pick word and pick category
    const {word, category} = pickWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");

    // transform all letters in lowercase mod
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    //fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    console.log(word, category);
    console.log(wordLetters);

    setGameStage(stages[1].name);
  };

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if(
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
      ){
        return;
    }

    // push guessed letters or remove a guess
    if(letters.includes(normalizedLetter)) {

      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {

      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }

  }
  
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {

    if(guesses <= 0) {
      // reset all states
      clearLetterStates();


      setGameStage(stages[2].name);
    }

  }, [guesses]);

  // restarts the game
  const returnHome = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  }



  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters} 
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
        )} 
      {gameStage === 'end' && <GameOver returnHome={returnHome} score={score}/>}
    </div>
  )
}

export default App
