import { useState } from "react";
import { calculateWinner } from "../helpers/calculateWinner";
import '../assets/TicTacGame.css';
import Board from './TicTacBoard';

  const Game = () => {
    //Games History
    const [history, setHistory] = useState([{
      //Creamos un array dentro del objeto y lo llenamos con valores "null"
      squares: Array(9).fill(null)
    }]);

    //Determines who´s next
    const [xIsNext, setXIsNext] = useState(true);


    const handleClick = (i) => {
      const localHistory = [...history];
      const current = localHistory[localHistory.length - 1];
      const localSquares = [...current.squares];

      //Si hay un ganador, o si ya hay una "X" o "O" en un casillero retorna sin modificar.
      if(calculateWinner(localSquares) || localSquares[i]){
        return;
      }

      //Determina quien sigue
      localSquares[i] = xIsNext ? 'X' : 'O';
      //Alterna entre "X" o "O" para el proximo turno
      setXIsNext(!xIsNext);

      setHistory([...localHistory, {squares: localSquares}]);
    }
    //copia el array history
    const localHistory = [...history];
    const current = localHistory[localHistory.length - 1];
    const winner = calculateWinner(current.squares);

    const jumpTo = () => {
      console.log("HOLA");
    }
    let status;

    if (winner) {
      //Si Hay un ganador
      status = 'Winner: ' + winner;
    }
    //Si hay empate, es decir, no hay más Squares en null en el array y tampoco ganador.
    else if(!winner && !current.squares.includes(null)){
      status = 'Empate';
    }
    //Si no se cumple el patron y hay Squares con valor null aun
    else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const moves = localHistory.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button className="move-btn" onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              onClick={(i) => handleClick(i)}
              squares={current.squares}
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol className="moves-list">{moves}</ol>
          </div>
        </div>
      );
    
  }
  
  // ========================================
  
  export default Game;