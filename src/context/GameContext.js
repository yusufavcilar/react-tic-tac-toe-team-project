import { createContext, useState } from "react";
import createInitialState from "../utils/createInitialState";

export const GameContext = createContext();

const GameWrapper = ({ children }) => {
  // buton state
  const [buttons, setButtons] = useState(createInitialState().buttons);
  // buton kontrolu state
  const [buttonState, setButtonState] = useState(
    createInitialState().buttonState
  );
  // game over
  const [gameOver, setGameOver] = useState(false);
  // son hamle
  const [lastMove, setLastMove] = useState({ row: null, col: null });
  // kimin sirasi?
  const [turn, setTurn] = useState("player");

  return (
    <GameContext.Provider
      value={{
        buttons,
        setButtons,
        buttonState,
        setButtonState,
        gameOver,
        setGameOver,
        lastMove,
        setLastMove,
        turn,
        setTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameWrapper;
