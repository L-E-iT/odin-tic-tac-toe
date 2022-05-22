import { gameBoard } from "./modules/gameBoard.js";
import { displayController } from "./modules/displayController.js"

const board = gameBoard();
const controller = displayController();

const nameForm = document.querySelector("form")
const resetButton = document.querySelector("button")

function playerMove(e) {
    const currentPlayer = board.getCurrentPlayer();
    currentPlayer.addSelection(e.target.getAttribute("data-id"));
    e.target.textContent = currentPlayer.boardLetter;
    if (board.isWinner(currentPlayer)) {
        console.log("Winner", currentPlayer.playerName)
        currentPlayer.totalWins += 1
    }
}

nameForm.addEventListener("submit", controller.generateBoard.bind(null, playerMove))
resetButton.addEventListener("click", controller.resetBoard)