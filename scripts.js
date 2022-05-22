import { gameBoard } from "./modules/gameBoard.js";
import { displayController } from "./modules/displayController.js"

const board = gameBoard();
const controller = displayController();

const nameForm = document.querySelector("form")
const resetButton = document.querySelector("#reset-btn")

function playerMove(e) {
    if (e.target.textContent !== "")  {
        return false;
    }

    const currentPlayer = board.getCurrentPlayer();
    currentPlayer.addSelection(e.target.getAttribute("data-id"));
    e.target.textContent = currentPlayer.boardLetter;
    if (board.isWinner(currentPlayer)) {
        currentPlayer.totalWins += 1
        board.resetToggleValue()
        board.playerOne.resetSelection();
        board.playerTwo.resetSelection();
        controller.updateWins(currentPlayer);
        controller.createWinPrompt(currentPlayer);
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

function resetGame(e) {
    board.resetGameState();
    controller.resetBoardDOM(e)
}

nameForm.addEventListener("submit", generateGame)
resetButton.addEventListener("click", resetGame)