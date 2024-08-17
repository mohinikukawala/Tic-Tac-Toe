import Player from "./components/player"
import GameBoard from "./components/Gameboard"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

const deriveActivePlayer = (turns) => {
  let playerSymbol = "X";

    if(turns.length > 0 && turns[0].player === "X"){
      playerSymbol = "O";
    } 

    return playerSymbol;
}

const deriveGameBoard = (turns) => {
  const gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

    for(const turn of turns){
        const{square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

const isWinner = (gameBoard, players) => {
  let winner = null;

  for (const winCombination of WINNING_COMBINATIONS){
    const firstSymbol = gameBoard[winCombination[0].row][winCombination[0].col];
    const secondSymbol = gameBoard[winCombination[1].row][winCombination[1].col];
    const thirdSymbol = gameBoard[winCombination[2].row][winCombination[2].col];

    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol){
      winner = players[firstSymbol];
    }
  }

  return winner;
}

function App() {
  const[turns, setTurns] = useState([]);
  const[players, setPlayers] = useState({
    X : "Player 1",
    O : "Player 2"
  })

  const activePlayer = deriveActivePlayer(turns);

  const gameBoard = deriveGameBoard(turns);

  const winner = isWinner(gameBoard, players);

  const hasDraw = !winner && turns.length === 9;

  const handleSquareSelect = (rowIndex, colIndex) => {
    setTurns(prevTurn => {
      const updatedTurns = [{
        square : {row : rowIndex, col : colIndex},
        player : deriveActivePlayer(prevTurn)
      } , ...prevTurn];

      return updatedTurns;
    })
  }

  const onSavePlayers = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }

  const handleRestart = () => {
    setTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={players["X"]} symbol="X" isActive = {activePlayer === "X"} savePlayers={onSavePlayers}></Player>
          <Player name={players["O"]} symbol="O" isActive = {activePlayer === "O"} savePlayers={onSavePlayers}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRestart={handleRestart}/>}
        <GameBoard onSquareSelect={handleSquareSelect} activePlayerSymbol={activePlayer} board={gameBoard}></GameBoard>
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App
