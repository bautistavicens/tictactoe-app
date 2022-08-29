import React, { useState } from 'react';
import '../assets/TicTacGame.css';
import { calculateWinner } from '../helpers/calculateWinner';

const Square = ({value, onClick}) => {

    return (
      <button 
        className="square"
        onClick = {() => onClick()}
      >
        { value }
      </button>
    );
    
}
  
  const Board = () => {
    //Creamos un array y lo llenamos con valores "null"
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
      //copiamos el array
      const localSquares = [...squares];

      //Si hay un ganador, o si ya hay una "X" o "O" en un casillero retorna sin modificar.
      if(calculateWinner(localSquares) || localSquares[i]){
        return;
      }
      //otra forma
      //const localSquares = [squares.slice()];
      localSquares[i] = xIsNext ? 'X' : 'O';
      setXIsNext(!xIsNext);
      setSquares(localSquares);
    };

    const renderSquare = (i) =>{
      return ( 
        <Square 
          value = {squares[i]}
          onClick = {() => handleClick(i)}
        />);
    }
  
    //Informa a que jugador le toca en el proximo turno.
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } 
    else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      );
    
  }
  
  const Game = () => {
   
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    
  }
  
  // ========================================
  
  export default Game;