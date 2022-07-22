const findRandomEmptyButton = (buttons) => {
  let emptyButtons = {};
  for (let row in buttons) {
    // finds empty buttons that cpu can play
    let emptyButtonsInRow = buttons[row]
      .map((btn, index) => (!btn ? index : btn))
      .filter((btn) => typeof btn === 'number');

    // if there's still empty buttons in a row,
    // add that row's array to emptyButtons object
    if (emptyButtonsInRow.length > 0) emptyButtons[row] = emptyButtonsInRow;
  }

  // finds a random row that has an empty button
  // https://1loc.dev/random/pick-a-random-property-of-an-object/
  const randomRow =
    Object.keys(emptyButtons)[
      (Math.random() * Object.keys(emptyButtons).length) | 0
    ];

  // finds a random column that has an empty button for the random row found above
  // https://1loc.dev/random/get-a-random-item-from-an-array/
  const randomCol =
    emptyButtons[randomRow][
      (Math.random() * emptyButtons[randomRow].length) | 0
    ];
  // if emptyButtons only have one key,
  // and if length of the value of that key is 1
  // that turn is the last one and game is over
  if (
    Object.keys(emptyButtons).length === 1 &&
    emptyButtons[Object.keys(emptyButtons)[0]].length === 1
  ) {
    return { row: Number(randomRow), col: randomCol, gameOver: true };
  }

  return { row: Number(randomRow), col: randomCol, gameOver: false };
};
export default findRandomEmptyButton;
