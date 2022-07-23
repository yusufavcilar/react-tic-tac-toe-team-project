import { useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '../context/GameContext';

const Button = ({ row, col }) => {
  const {
    buttons,
    setButtons,
    turn,
    setTurn,
    lastMove,
    gameOver,
    setLastMove,
    buttonState,
  } = useContext(GameContext);

  const [highlight, setHighlight] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (
      buttonState[row][col].h ||
      buttonState[row][col].v ||
      buttonState[row][col].d1 ||
      buttonState[row][col].d2
    ) {
      setHighlight(true);
    }
    else {
      setHighlight(false);
    }
  }, [buttonState, col, row]);

  const handleClick = () => {
    if (turn === 'player' && !gameOver && buttons[row][col] === null) {
      setButtons({
        ...buttons,
        [row]: buttons[row].map((button, index) =>
          col === index ? 'X' : button
        ),
      });
      setLastMove({ row, col });
      setTurn('cpu');
      buttonRef.current.disabled = true;
    }
  };
 

  return (
    <>
    <button
      className={highlight ? 'highlight' : ""}
      ref={buttonRef}
      onClick={handleClick}
      disabled={buttons[row][col]}
    >
      {buttons?.[row]?.[col]}
    </button>
    </>
    
  );
};
export default Button;
