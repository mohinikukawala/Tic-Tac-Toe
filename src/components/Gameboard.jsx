import { useState } from "react";

const GameBoard = ({onSquareSelect, activePlayerSymbol, board}) => {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return (<li key={rowIndex}>
                    <ol>
                    {row.map((playerSymbol, colIndex) => {
                        return (<li key={colIndex}>
                            <button onClick={() => onSquareSelect(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>
                            )    
                        })}
                    </ol>
                        </li>
                        )
                    })}
        </ol>
    )
}

export default GameBoard;