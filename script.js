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
  let mark = "x";
  const cellClicked = (numberOfCell) =>
    gameBoard.changeBoard(numberOfCell, mark);
  return { cellClicked };
})();

const newGameButton = document.querySelector("#newGame");
newGameButton.addEventListener("click", () => {
  screenCreator();
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
  newGameButton.classList.add("off");
}
