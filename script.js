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
  const checkGameWinner = () => {
    if (board[0] == board[1] && board[0] == board[2] && board[0] != "")
      return "gameOver";
    if (board[3] == board[4] && board[3] == board[5] && board[3] != "")
      return "gameOver";
    if (board[6] == board[7] && board[6] == board[8] && board[6] != "")
      return "gameOver";
    if (board[0] == board[3] && board[0] == board[6] && board[0] != "")
      return "gameOver";
    if (board[1] == board[4] && board[1] == board[7] && board[1] != "")
      return "gameOver";
    if (board[2] == board[5] && board[8] == board[2] && board[2] != "")
      return "gameOver";
    if (board[0] == board[4] && board[0] == board[8] && board[0] != "")
      return "gameOver";
    if (board[2] == board[4] && board[2] == board[6] && board[2] != "")
      return "gameOver";
    let isCellAvaiable;
    for (let i = 0; i < 9; i++) {
      if (board[i] == "") isCellAvaiable = "yes";
    }
    if (isCellAvaiable != "yes") return "tie";
  };
  const cleanBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { cleanBoard, checkGameWinner, changeBoard };
})();
let listenerAdded = false;
const boardDiv = document.querySelector(".board");
const gameController = (() => {
  let playerMark;
  let computerMark;
  const startGame = (playerMarkChoice) => {
    playerMark = playerMarkChoice;
    if (playerMark == "x") computerMark = "o";
    if (playerMark == "o") {
      computerMark = "x";
      computerPlay();
    }
  };
  const cellClicked = (numberOfCell) => {
    if (gameBoard.changeBoard(numberOfCell, playerMark) == "validTurn") {
      const markedCell = document.getElementById(numberOfCell);
      markedCell.textContent = playerMark;
      if (gameBoard.checkGameWinner() != "gameOver") {
        computerPlay();
      } else winnerScreen("player");
      if (gameBoard.checkGameWinner() == "tie") winnerScreen("tie");
    }
  };
  const computerPlay = (/*difficulty*/) => {
    for (let i = 0; i < 100; i++) {
      computerRandomChoice = Math.floor(Math.random() * 9);
      if (
        gameBoard.changeBoard(computerRandomChoice, computerMark) !== "occupied"
      )
        break;
    }
    const markedCell = document.getElementById(computerRandomChoice);
    markedCell.textContent = computerMark;
    if (gameBoard.checkGameWinner() == "gameOver") winnerScreen("computer");
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
      const startGameButton = document.querySelector("#startGame");
      startGameButton.classList.remove("off");
      if (!listenerAdded) {
        startGameButton.addEventListener("click", () => {
          gameController.startGame(
            document
              .querySelector('input[type="radio"]:checked')
              .getAttribute("value")
          );
          startGameButton.classList.add("off");
          optionButtons.classList.add("off");
          boardDiv.classList.remove("unclickable");
        });
        listenerAdded = true;
      }
      optionButtons.classList.remove("off");
    });
  };
  return { startGame, cellClicked };
})();

const newGameButton = document.querySelector("#newGame");
newGameButton.addEventListener("click", () => {
  screenCreator();
  let playerMark = document
    .querySelector('input[type="radio"]:checked')
    .getAttribute("value");
  gameController.startGame(playerMark);
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
