import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

const playerX = "X";
const playerO = "O";

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol={playerX}
            isActive={activePlayer === playerX}
          />
          <Player
            name="Player 2"
            symbol={playerO}
            isActive={activePlayer === playerO}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

function derivedActivePlayer(turns) {
  let activePlayer = playerX;

  if (turns.length > 0 && turns[0].player === playerX) {
    activePlayer = playerO;
  }

  return activePlayer;
}

export default App;
