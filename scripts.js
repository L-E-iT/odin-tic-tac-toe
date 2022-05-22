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
    } else {
        controller.updateTurnMessage(board.getNextPlayer());
    }
}

function generateGame(e) {
    const formData = new FormData(nameForm)
    board.playerOne.playerName = formData.get("playerOne");
    board.playerTwo.playerName = formData.get("playerTwo")

    controller.generateBoard(playerMove, formData, e)
    nameForm.reset();
}

nameForm.addEventListener("submit", generateGame)
resetButton.addEventListener("click", controller.resetBoard)