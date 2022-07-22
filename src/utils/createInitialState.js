const createInitialState = () => {
  let buttons = {};
  let buttonState = {};
  for (let i = 1; i <= 20; i++) {
    const rowArr = [];
    const rowButtonState = [];
    for (let j = 0; j < 11; j++) {
      rowArr.push(null);
      rowButtonState.push({ h: false, v: false, d1: false, d2: false });
    }
    buttons[i] = rowArr;
    buttonState[i] = rowButtonState;
  }
  return { buttons, buttonState };
};
export default createInitialState;
