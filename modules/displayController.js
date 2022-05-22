const displayController = () => {

    const _gameContainer = document.querySelector(".game-container");
    const _formContainer = document.querySelector(".form-container");
    const _gameBoardContainer = document.querySelector(".game-board-container");
    const _gameScoreContainer = document.querySelector(".game-score-container");
    const _gameTurnMessageContainer = document.querySelector(".game-turn-message-container")

    function _toggleDOM(e) {
        e.preventDefault()

        const gameValue = _gameContainer.style.getPropertyValue("display") === "flex" ? "none": "flex";
        const formValue = _formContainer.style.getPropertyValue("display") === "none" ? "flex": "none";

        _gameContainer.style.setProperty("display", gameValue);
        _formContainer.style.setProperty("display", formValue);
    }

    function resetBoard(e) {
        while (_gameBoardContainer.firstChild != null) {
            _gameBoardContainer.firstChild.remove();
        }

        while (_gameScoreContainer.firstChild != null) {
            _gameScoreContainer.firstChild.remove();
        }

        _toggleDOM(e)
    }

    function generateBoard(playerMove, formData, e) {
        e.preventDefault();

        formData.forEach((value, key) => {
            let playerScoreContainer = document.createElement("div");
            let playerName = document.createElement("div");
            let playerScore = document.createElement("div");

            playerScoreContainer.setAttribute("player-id", key);
            playerScoreContainer.classList.add("text-medium", "player-score-container");
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
        console.log(nextPlayer)
        const turnMessage = document.querySelector(".turn-message")
        turnMessage.textContent = "It is " + nextPlayer.playerName + "'s turn."
    }

    return { generateBoard, resetBoard, updateTurnMessage };
}

export { displayController };