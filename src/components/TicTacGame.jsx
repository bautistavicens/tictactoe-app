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

    const [stepNumber, setStepNumber] = useState(0);

    const handleClick = (i) => {
      
      const localHistory = history.slice(0, stepNumber + 1);
      const current = localHistory[stepNumber];
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

      setStepNumber(localHistory.length)
    }
    //copia el array history
    const localHistory = [...history];
    const current = localHistory[stepNumber];
    const winner = calculateWinner(current.squares);

    const jumpTo = (step) => {
      setStepNumber(step);
      setXIsNext((step % 2) === 0);
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

    //Time travel
    const moves = localHistory.map((step, move) => {
      const desc = move ?
        //Si hubo algún movmiento
        'Go to move #' + move :
        //Si no hubo ningun movimiento
        'Go to game start';
      return (
        //Genera un boton para volver en el tiempo al movimiento solicitado.
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