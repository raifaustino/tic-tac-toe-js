const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text] "
);

const restartButton = document.getElementById("restartButton");

let oTurn;

const setBoardHoverClass = () => {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  oTurn ? board.classList.add(O_CLASS) : board.classList.add(X_CLASS);
};

function startGame() {
  oTurn = false;

  setBoardHoverClass();
  cellElements.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
  });
  winningMessageElement.classList.remove("show");
}

startGame();

restartButton.addEventListener("click", startGame);

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  //Checkforwin
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "EMPATE!";
  } else {
    winningMessageTextElement.innerText = `${oTurn ? "O" : "X"} GANHOU!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const switchTurns = () => {
  oTurn = !oTurn;
};

function checkWin(currentClass) {
  return WINNING_COMBOS.some((combo) => {
    return combo.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
