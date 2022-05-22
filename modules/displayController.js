const displayController = () => {

    const _gameContainer = document.querySelector(".game-container");
    const _formContainer = document.querySelector(".form-container");
    const _gameBoardContainer = document.querySelector(".game-board-container");
    const _gameScoreContainer = document.querySelector(".game-score-container");
    const _gameTurnMessageContainer = document.querySelector(".game-turn-message-container")
    const _winModalContainer = document.querySelector(".win-modal-container")
    const _winModalBoardContainer = document.querySelector(".win-modal-board-container")
    const _winPlayerMessage = document.querySelector(".win-player-message");

    function _toggleDOM(e) {
        e.preventDefault()

        const gameValue = _gameContainer.style.getPropertyValue("display") === "flex" ? "none": "flex";
        const formValue = _formContainer.style.getPropertyValue("display") === "none" ? "flex": "none";

        _gameContainer.style.setProperty("display", gameValue);
        _formContainer.style.setProperty("display", formValue);
    }

    function clearBoard() {
        const gameBoxes = document.querySelectorAll(".game-box");
        gameBoxes.forEach((box) => {
            box.textContent = "";
        })

        while (_winModalBoardContainer.firstChild != null) {
            _winModalBoardContainer.firstChild.remove();
        }

        _winPlayerMessage.textContent = "";
    }

    function resetBoardDOM(e) {
        while (_winModalBoardContainer.firstChild != null) {
            _winModalBoardContainer.firstChild.remove();
        }

        _winPlayerMessage.textContent = "";

        while (_gameBoardContainer.firstChild != null) {
            _gameBoardContainer.firstChild.remove();
        }

        while (_gameScoreContainer.firstChild != null) {
            _gameScoreContainer.firstChild.remove();
        }

        while(_gameTurnMessageContainer.firstChild != null) {
            _gameTurnMessageContainer.firstChild.remove();
        }

        _toggleDOM(e)
    }

    function generateBoard(playerMove, formData, e) {
        e.preventDefault();

        formData.forEach((value, key) => {
            let playerScoreContainer = document.createElement("div");
            let playerName = document.createElement("div");
            playerName.classList.add("player-name-" + key)
            let playerScore = document.createElement("div");
            playerScore.classList.add("player-score-" + key)

            playerScoreContainer.setAttribute("player-id", key);
            playerScoreContainer.classList.add("text-medium", "player-score-container-" + key);
            playerName.textContent = key === "playerOne"? String(value) + " (X)" : String(value) + " (O)";
            playerScore.textContent = "0";

            playerScoreContainer.appendChild(playerName);
            playerScoreContainer.appendChild(playerScore);

            _gameScoreContainer.appendChild(playerScoreContainer);
        });

        let turnMessage = document.createElement("div");
        turnMessage.classList.add("turn-message");
        turnMessage.textContent = "It is " + formData.get("playerOne") + "'s turn.";

        _gameTurnMessageContainer.appendChild(turnMessage);


        const rowClasses = ["row-top", "row-middle", "row-bottom"];
        const colClasses = ["col-left","col-middle","col-right"];
        let boardBoxCounter = 1;

        rowClasses.forEach(row => {
            colClasses.forEach(col => {
                const newBox = document.createElement("div")
                newBox.classList.add(col, row, "game-box")
                newBox.setAttribute("data-id", String(boardBoxCounter));
                _gameBoardContainer.appendChild(newBox);
                boardBoxCounter += 1;
            });
        });

        _toggleDOM(e);

        const gameBox = document.querySelectorAll(".game-box");

        gameBox.forEach((box) => {
            box.addEventListener("click", playerMove)
        });
    }

    function updateTurnMessage(nextPlayer) {
        const turnMessage = document.querySelector(".turn-message")
        turnMessage.textContent = "It is " + nextPlayer.playerName + "'s turn."
    }

    function updateWins(winningPlayer) {
        const playerScoreElement = document.querySelector(
            winningPlayer.boardLetter === "X"? ".player-score-playerOne" : ".player-score-playerTwo");
        playerScoreElement.textContent = winningPlayer.totalWins
    }

    function createWinPrompt(winningPlayerName) {
        _winModalContainer.style.setProperty("display", "block");

        const boardBoxes = _gameBoardContainer.childNodes

        boardBoxes.forEach((box) => {
            if (box.nodeName === "DIV") {
                let clonedBox = box.cloneNode(true);
                clonedBox.classList.replace("game-box", "win-game-box");
                _winModalBoardContainer.appendChild(clonedBox);
            }
        });

        let winningMessage = document.createElement("div");
        winningMessage.classList.add("text-medium","winning-message");
        winningMessage.textContent = winningPlayerName + " wins!";
        _winPlayerMessage.appendChild(winningMessage);

        let nextGameButton = document.querySelector(".next-game-button");
        nextGameButton.addEventListener("click", removeWinPrompt);
    }

    function removeWinPrompt() {
        _winModalContainer.style.setProperty("display", "none");
        clearBoard()
    }

    return { generateBoard, resetBoardDOM, updateTurnMessage, updateWins, createWinPrompt };
}

export { displayController };