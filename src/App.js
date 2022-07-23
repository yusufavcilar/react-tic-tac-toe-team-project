import "./App.css";
import GameWrapper, { GameContext, ThemeContext } from "./context/GameContext";
import { useContext, useEffect } from "react";
import Container from "./components/Container";
import Buttons from "./components/Buttons";
import findRandomEmptyButton from "./utils/findRandomEmptyButton";
import createInitialState from "./utils/createInitialState";

function App() {
  const {
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
  } = useContext(GameContext);

  useEffect(() => {
    if (turn === "cpu") {
      const { row, col, gameOver: go } = findRandomEmptyButton(buttons);
      setGameOver(go);
      setLastMove({ row, col });
      setButtons({
        ...buttons,
        [row]: buttons[row].map((button, index) =>
          col === index ? "O" : button
        ),
      });
      setTurn("player");
    }
  }, [turn]);

  useEffect(() => {
    const handleHorizontal = (row, first, second, third) => {
      setButtonState({
        ...buttonState,
        [row]: buttonState[row].map((obj, index) => {
          if (index === first || index === second || index === third) {
            return {
              ...obj,
              h: true,
            };
          } else return obj;
        }),
      });
    };

    const handleVertical = (col, first, second, third) => {
      setButtonState({
        ...buttonState,
        [first]: buttonState[first].map((obj, index) =>
          index === col ? { ...obj, v: true } : obj
        ),
        [second]: buttonState[second].map((obj, index) =>
          index === col ? { ...obj, v: true } : obj
        ),
        [third]: buttonState[third].map((obj, index) =>
          index === col ? { ...obj, v: true } : obj
        ),
      });
    };

    const handleDiagonal = (first, second, third, type) => {
      setButtonState({
        ...buttonState,
        [first.row]: buttonState[first.row].map((obj, index) =>
          index === first.col ? { ...obj, [type]: true } : obj
        ),
        [second.row]: buttonState[second.row].map((obj, index) =>
          index === second.col ? { ...obj, [type]: true } : obj
        ),
        [third.row]: buttonState[third.row].map((obj, index) =>
          index === third.col ? { ...obj, [type]: true } : obj
        ),
      });
    };
    const { row, col } = lastMove;

    if (row !== null && col !== null) {
      console.log("row:", row);
      console.log("col", col);

      // Yatay
      // En son tiklanan en sol tuş
      if (
        col >= 0 &&
        col <= 9 &&
        buttons[row][col] &&
        buttons[row][col] === buttons[row][col + 1] &&
        buttons[row][col] === buttons[row][col + 2] &&
        !buttonState[row][col].h &&
        !buttonState[row][col + 1].h &&
        !buttonState[row][col + 2].h
      ) {
        handleHorizontal(row, col, col + 1, col + 2);
      }
      // En son tiklanan ortada
      else if (
        col >= 1 &&
        col <= 9 &&
        row >= 1 &&
        row <= 20 &&
        buttons[row][col] === buttons[row][col + 1] &&
        buttons[row][col] === buttons[row][col - 1] &&
        buttons[row][col] &&
        !buttonState[row][col].h &&
        !buttonState[row][col + 1].h &&
        !buttonState[row][col - 1].h
      ) {
        handleHorizontal(row, col, col - 1, col + 1);
      }
      // En son tiklanan en sagda
      else if (
        col >= 2 &&
        col <= 10 &&
        row >= 1 &&
        row <= 20 &&
        buttons[row][col] === buttons[row][col - 1] &&
        buttons[row][col] === buttons[row][col - 2] &&
        buttons[row][col] &&
        !buttonState[row][col].h &&
        !buttonState[row][col - 1].h &&
        !buttonState[row][col - 2].h
      ) {
        handleHorizontal(row, col, col - 1, col - 2);
      }
      // Dikey
      // En son tiklanan en ust tus
      if (
        row >= 1 &&
        row <= 18 &&
        col >= 0 &&
        col <= 10 &&
        buttons[row][col] === buttons[row + 1][col] &&
        buttons[row][col] === buttons[row + 2][col] &&
        buttons[row][col] &&
        !buttonState[row][col].v &&
        !buttonState[row + 1][col].v &&
        !buttonState[row + 2][col].v
      ) {
        handleVertical(col, row, row + 1, row + 2);
      }
      // En son tiklnan orta tus
      else if (
        row >= 2 &&
        row <= 19 &&
        col >= 0 &&
        col <= 10 &&
        buttons[row][col] === buttons[row + 1][col] &&
        buttons[row][col] === buttons?.[row - 1]?.[col] &&
        buttons[row][col] &&
        !buttonState[row][col].v &&
        !buttonState[row + 1][col].v &&
        !buttonState?.[row - 1]?.[col]?.v
      ) {
        handleVertical(col, row, row - 1, row + 1);
      }
      // En son tiklanan en alt tus
      else if (
        row >= 3 &&
        row <= 20 &&
        col >= 0 &&
        col <= 10 &&
        buttons[row][col] === buttons[row - 1][col] &&
        buttons[row][col] === buttons[row - 2][col] &&
        buttons[row][col] &&
        !buttonState[row][col].v &&
        !buttonState[row - 1][col].v &&
        !buttonState[row - 2][col].v
      ) {
        handleVertical(col, row, row - 1, row - 2);
      }
      // Çapraz 1 (sol ustten sağ alta)
      // Son tıklanan sol ust tuş
      if (
        col >= 0 &&
        col <= 8 &&
        row <= 18 &&
        row >= 1 &&
        buttons[row][col] === buttons[row + 1][col + 1] &&
        buttons[row][col] === buttons[row + 2][col + 2] &&
        buttons[row][col] &&
        !buttonState[row][col].d1 &&
        !buttonState[row + 1][col + 1].d1 &&
        !buttonState[row + 2][col + 2].d1
      ) {
        handleDiagonal(
          { row, col },
          { row: row + 1, col: col + 1 },
          { row: row + 2, col: col + 2 },
          "d1"
        );
      }
      // Son tiklnan orta tus
      else if (
        col >= 1 &&
        col <= 9 &&
        row >= 2 &&
        row <= 19 &&
        buttons[row][col] === buttons[row - 1][col - 1] &&
        buttons[row][col] === buttons[row + 1][col + 1] &&
        buttons[row][col] &&
        !buttonState[row][col].d1 &&
        !buttonState[row - 1][col - 1].d1 &&
        !buttonState[row + 1][col + 1].d1
      ) {
        handleDiagonal(
          { row, col },
          { row: row - 1, col: col - 1 },
          { row: row + 1, col: col + 1 },
          "d1"
        );
      }
      // Son tiklanan sag alt tus
      else if (
        col >= 2 &&
        col <= 10 &&
        row >= 3 &&
        row <= 20 &&
        buttons[row][col] === buttons[row - 1][col - 1] &&
        buttons[row][col] === buttons[row - 2][col - 2] &&
        buttons[row][col] &&
        !buttonState[row][col].d1 &&
        !buttonState[row - 1][col - 1].d1 &&
        !buttonState[row - 2][col - 2].d1
      ) {
        handleDiagonal(
          { row, col },
          { row: row - 1, col: col - 1 },
          { row: row - 2, col: col - 2 },
          "d1"
        );
      }

      // Çapraz 2 (sag ustten sol alta)
      // En son tıklanan sağ ust
      if (
        col >= 2 &&
        col <= 10 &&
        row <= 18 &&
        row >= 0 &&
        buttons[row][col] === buttons[row + 1][col - 1] &&
        buttons[row][col] === buttons[row + 2][col - 2] &&
        buttons[row][col] &&
        !buttonState[row][col].d2 &&
        !buttonState[row + 1][col - 1].d2 &&
        !buttonState[row + 2][col - 2].d2
      ) {
        handleDiagonal(
          { row, col },
          { row: row + 1, col: col - 1 },
          { row: row + 2, col: col - 2 },
          "d2"
        );
      }
      // En son tıklanan orta
      else if (
        col >= 1 &&
        col <= 9 &&
        row >= 2 &&
        row <= 19 &&
        buttons[row][col] === buttons[row - 1][col + 1] &&
        buttons[row][col] === buttons[row + 1][col - 1] &&
        buttons[row][col] &&
        !buttonState[row][col].d2 &&
        !buttonState[row - 1][col + 1].d2 &&
        !buttonState[row + 1][col - 1].d2
      ) {
        handleDiagonal(
          { row, col },
          { row: row - 1, col: col + 1 },
          { row: row + 1, col: col - 1 },
          "d2"
        );
      }
      // En son tıklanan sol alt
      else if (
        col >= 0 &&
        col <= 8 &&
        row >= 3 &&
        row <= 20 &&
        buttons[row][col] === buttons[row - 1][col + 1] &&
        buttons[row][col] === buttons[row - 2][col + 2] &&
        buttons[row][col] &&
        !buttonState[row][col].d2 &&
        !buttonState[row - 1][col + 1].d2 &&
        !buttonState[row - 2][col + 2].d2
      ) {
        handleDiagonal(
          { row, col },
          { row: row - 1, col: col + 1 },
          { row: row - 2, col: col + 2 },
          "d2"
        );
      }
    }
  }, [buttonState, buttons, lastMove, setButtonState, turn]);

  const clickRestart = () => {
    setButtons(createInitialState().buttons);
    setButtonState(createInitialState().buttonState);
    setGameOver(false);
    setLastMove({ row: null, col: null });
    setTurn("player");
  };

  return (
    <Container>
      <Buttons />
      <button
        onClick={() => {
          clickRestart();
        }}
        className="restart-btn"
      >
        Restart
      </button>
    </Container>
  );
}

export default App;
