//Patrones para determinar quien gana
export const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //El for analiza si se cumple algún patron
    for (let i = 0; i < lines.length; i++) {

      const [a, b, c] = lines[i];
      //Si se cumple algún patron y los elementos de este son iguaales (XXX o OOO) retorna al ganador
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    //Si no se cumple la condición del anterior if, retorna null
    return null;
  };