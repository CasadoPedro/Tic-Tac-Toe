const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const checkAvaiableCell = (numberOfCell) => {
    if (board[numberOfCell] == "") return "avaiable";
    else return "unavaiable";
  };
  const changeBoard = (cellChosen, mark) => {
    if (checkAvaiableCell(cellChosen) == "avaiable") {
      board[cellChosen] = mark;
      console.log(board);
      return "validTurn";
    } else return "occupied";
  };
  const getBoard = () => {
    return board;
  };
  const checkGameWinner = () => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return "gameOver";
      }
    }
    let isCellAvaiable;
    for (let i = 0; i < 9; i++) {
      if (board[i] == "") isCellAvaiable = "yes";
    }
    if (isCellAvaiable != "yes") return "tie";
  };
  const cleanBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { getBoard, cleanBoard, checkGameWinner, changeBoard };
})();
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const boardDiv = document.querySelector(".board");
const gameController = (() => {
  let playerMark;
  let computerMark;
  let difficulty;
  const startGame = (playerMarkChoice, gameDifficulty) => {
    playerMark = playerMarkChoice;
    difficulty = gameDifficulty;
    if (playerMark == "x") computerMark = "o";
    if (playerMark == "o") {
      computerMark = "x";
      computerPlay(difficulty);
    }
  };
  const cellClicked = (numberOfCell) => {
    if (gameBoard.changeBoard(numberOfCell, playerMark) == "validTurn") {
      const markedCell = document.getElementById(numberOfCell);
      markedCell.textContent = playerMark;
      if (gameBoard.checkGameWinner() != "gameOver") {
        computerPlay(difficulty);
      } else winnerScreen("player");
      if (gameBoard.checkGameWinner() == "tie") winnerScreen("tie");
    }
  };
  const checkPossibleWinMove = (board) => {
    for (let pattern of winMovePatterns) {
      const [a, b, c] = pattern;
      if (board[a] !== "" && board[a] === board[b] && board[c] === "") {
        return c;
      } else if (board[a] !== "" && board[a] === board[c] && board[b] === "") {
        return b;
      } else if (board[b] !== "" && board[b] === board[c] && board[a] === "") {
        return a;
      }
    }
    return null;
  };
  const computerPlay = (difficulty) => {
    let computerRandomChoice;
    function playMove(move) {
      const markedCell = document.getElementById(move);
      markedCell.textContent = computerMark;
      boardDiv.classList.remove("unclickable");
      if (gameBoard.checkGameWinner() == "gameOver") winnerScreen("computer");
      if (gameBoard.checkGameWinner() == "tie") winnerScreen("tie");
    }
    boardDiv.classList.add("unclickable");
    function randomMove() {
      //MAKE A RANDOM MOVE
      for (let i = 0; i < 100; i++) {
        computerRandomChoice = Math.floor(Math.random() * 9);
        if (
          gameBoard.changeBoard(computerRandomChoice, computerMark) !==
          "occupied"
        )
          break;
      }
      playMove(computerRandomChoice);
    }
    setTimeout(() => {
      if (difficulty == "easy") {
        randomMove();
      }
      if (difficulty == "medium") {
        let actualBoard = gameBoard.getBoard();
        let winningMove = checkPossibleWinMove(actualBoard);
        if (winningMove != null) {
          gameBoard.changeBoard(winningMove, computerMark);
          playMove(winningMove);
        } else randomMove();
      }
    }, 1000);
  };
  const winnerMessage = document.querySelector("#playerWinsMessage");
  const losserMessage = document.querySelector("#computerWinsMessage");
  const tieMessage = document.querySelector("#tieMessage");
  const winnerScreen = (winner) => {
    boardDiv.classList.add("unclickable");
    if (winner == "player") winnerMessage.classList.remove("off");
    if (winner == "computer") losserMessage.classList.remove("off");
    if (winner == "tie") tieMessage.classList.remove("off");
    newGame(winner);
  };
  const startGameButton = document.querySelector("#startGame");
  const startGameFunction = () => {
    let playerMarker = document
      .querySelector('input[type="radio"][name="playerMarker"]:checked')
      .getAttribute("value");
    let gameDifficulty = document
      .querySelector('input[type="radio"][name="difficultySelector"]:checked')
      .getAttribute("value");
    gameController.startGame(playerMarker, gameDifficulty);
    if (playerMarker == "x") boardDiv.classList.remove("unclickable");
    startGameButton.classList.add("off");
    optionButtons.classList.add("off");
  };
  startGameButton.addEventListener("click", startGameFunction);
  const newGame = (winner) => {
    const playAgainButton = document.querySelector("#playAgain");
    playAgainButton.classList.remove("off");
    playAgainButton.addEventListener("click", () => {
      if (winner == "player") winnerMessage.classList.add("off");
      if (winner == "computer") losserMessage.classList.add("off");
      else tieMessage.classList.add("off");
      playAgainButton.classList.add("off");
      gameBoard.cleanBoard();
      for (let i = 0; i < 9; i++) {
        const boardCellButton = document.getElementById(i);
        boardCellButton.textContent = "";
      }
      startGameButton.classList.remove("off");
      optionButtons.classList.remove("off");
    });
  };
  return { startGame, cellClicked };
})();

const newGameButton = document.querySelector("#newGame");
newGameButton.addEventListener("click", () => {
  screenCreator();
  let playerMark = document
    .querySelector('input[type="radio"][name="playerMarker"]:checked')
    .getAttribute("value");
  let gameDifficulty = document
    .querySelector('input[type="radio"][name="difficultySelector"]:checked')
    .getAttribute("value");
  gameController.startGame(playerMark, gameDifficulty);
  newGameButton.classList.add("off");
});
const optionButtons = document.querySelector(".buttons");
function screenCreator() {
  for (let i = 0; i < 9; i++) {
    const boardCellButton = document.createElement("button");
    boardCellButton.setAttribute("id", i);
    boardCellButton.classList.add("cell");
    boardCellButton.addEventListener("click", () => {
      gameController.cellClicked(boardCellButton.getAttribute("id"));
    });
    boardDiv.appendChild(boardCellButton);
  }
  optionButtons.classList.add("off");
}
