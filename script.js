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

let boardColorInput = document.querySelector("#boardColorInput");
let boardColor = document.querySelector("#board");

let xColorInput = document.querySelector("#xColorInput");
let oColorInput = document.querySelector("#oColorInput");

let boardColorChange = boardColorInput.addEventListener("input", () => {
  let color = boardColorInput.value;
  boardColor.style.backgroundColor = color;
  console.log("mudou a cor do fundo");
  console.log(color);
});

let xColorChange = xColorInput.addEventListener("input", () => {
  let color = xColorInput.value;

  [...cellElements].forEach(function (cell) {
    if (cell.classList.contains(X_CLASS)) {
      cell.style.setProperty("--x-color", color);
    }
  });

  console.log("mudou a cor do X");
  console.log(color);
});

let oColorChange = oColorInput.addEventListener("input", () => {
  let color = oColorInput.value;
  [...cellElements].forEach(function (cell) {
    if (cell.classList.contains(O_CLASS)) {
      cell.style.setProperty("--o-color", color);
    }
  });

  console.log("mudou a cor do O");
  console.log(color);
});

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
  const colorUpdate = oTurn ? oColorInput.value : xColorInput.value;

  placeMark(cell, currentClass, colorUpdate);

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

const placeMark = (cell, currentClass, colorUpdate) => {
  cell.classList.add(currentClass);
  oTurn
    ? cell.style.setProperty("--o-color", colorUpdate)
    : cell.style.setProperty("--x-color", colorUpdate);
  console.log(oTurn);
  console.log(colorUpdate);
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
