const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const cellElements = document.querySelectorAll(`[data-cell]`);
const winningTextElement = document.querySelector(`[data-game-status-text]`);

const board = document.getElementById("board");
const restartButton = document.getElementById("restart-button");
const gameMessage = document.getElementById("game-message");

const playerPoints = document.querySelectorAll("h2");

let circleTurn;
let xPlayerPoints = 0;
let circlePlayerPoints = 0;

startGame();


restartButton.addEventListener("click", () => {
  startGame();

});

function startGame() {
  circleTurn = false;

  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  })
  setBoardHoverClass();
  gameMessage.classList.remove("show")
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMarck(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw(true)) {
    endGame(true)
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function endGame(draw) {
  if (draw) {
    winningTextElement.innerHTML = "It's a DRAW!"
  } else {
    winningTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`
    keepScore(circleTurn);
  }
  gameMessage.classList.add("show");
}

function placeMarck(cell, currentClass) {
  cell.classList.add(currentClass);
  console.log(currentClass);
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    })
  })
}

function swapTurns() { circleTurn = !circleTurn; }

function keepScore(circleTurn) {
  if (!circleTurn) {
    xPlayerPoints++;
    playerPoints[0].innerHTML = `${xPlayerPoints} POINTS`
  } else {
    circlePlayerPoints++;
    playerPoints[1].innerHTML = `${circlePlayerPoints} POINTS`
  }
}