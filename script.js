const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const checkAvaiableCell = (numberOfCell) => {
    if (board[numberOfCell] === "") return "avaiable";
    else return "unavaiable";
  };
  const changeBoard = (cellChosen, mark) => {
    if (checkAvaiableCell(cellChosen) == "avaiable") {
      board[cellChosen] = mark;
      console.log(board);
      return "validTurn";
    } else return "occupied";
  };
  return { changeBoard };
})();

const gameController = (() => {
  let playerMark;
  let computerMark;
  const startGame = (playerMarkChoice) => {
    playerMark = playerMarkChoice;
    if (playerMark == "x") computerMark = "o";
    else computerMark = "x";
  };
  const cellClicked = (numberOfCell) => {
    if (gameBoard.changeBoard(numberOfCell, playerMark) == "validTurn") {
      const markedCell = document.getElementById(numberOfCell);
      markedCell.textContent = playerMark;
      console.log(playerMark, computerMark);
      computerPlay();
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
  };
  return { startGame, cellClicked };
})();

const newGameButton = document.querySelector("#newGame");
newGameButton.addEventListener("click", () => {
  screenCreator();
  const playerMark = document
    .querySelector('input[type="radio"]:checked')
    .getAttribute("value");
  gameController.startGame(playerMark);
});
function screenCreator() {
  const boardDiv = document.querySelector(".board");
  for (let i = 0; i < 9; i++) {
    const boardCellButton = document.createElement("button");
    boardCellButton.setAttribute("id", i);
    boardCellButton.classList.add("cell");
    boardCellButton.addEventListener("click", () => {
      gameController.cellClicked(boardCellButton.getAttribute("id"));
    });
    boardDiv.appendChild(boardCellButton);
  }
  const optionButtons = document.querySelector(".buttons");
  optionButtons.classList.add("off");
}
