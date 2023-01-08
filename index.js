const tileElements = Array.from(document.querySelectorAll(".tile")); //Target all the tiles
const playerDisplay = document.querySelector(".display-player");
const restartButton = document.querySelector("#restart");
const announcer = document.querySelector(".announcer");

// Creating the variables 
let board = ["", "", "", "", "", "", "", "", ""]; 
let currentPlayer = "X"; 
let isGameWorking = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
    isGameWorking = false;
    return;
  }

  if (!board.includes("")) announce(TIE);
}

// Announcing the winner or end game state
const announce = (type) => {
  switch (type) {
    case PLAYERO_WON:
      announcer.innerHTML =
        '&#x1F389; PLAYER <span class="playerO">O</span> WON! &#x1F389;';
      break;
    case PLAYERX_WON:
      announcer.innerHTML =
        '&#x1F389; PLAYER <span class="playerX">X</span> WON! &#x1F389;';
      break;
    case TIE:
      announcer.innerText = "IT'S A TIE!";
  }
  announcer.classList.remove("hide");
};

const isValidAction = (tile) => {
  if (tile.innerText === "X" || tile.innerText === "O") {
    return false;
  }
  return true;
};

const updateBoard = (index) => {
  board[index] = currentPlayer;
};

// Switching player's turns
const swapPlayers = () => {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
};

// Represents a turn in the game
const userAction = (tile, index) => {
  if (isValidAction(tile) && isGameWorking) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    swapPlayers();
  }
};

// Resets the game state and the board
const resetBoard = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameWorking = true;
  announcer.classList.add("hide");

  if (currentPlayer === "O") {
    swapPlayers();
  }

  tileElements.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  });
};

tileElements.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile, index));
});

// Restart button with click handler
restartButton.addEventListener("click", resetBoard);