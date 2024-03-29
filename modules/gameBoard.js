const gameBoard = () => {
    const _winningBoards = [["1","5","9"],["3","5","7"],["1","2","3"]
        ,["4","5","6"],["7","8","9"],["1","4","7"],["2","5","8"],["3","6","9"]]
    let _toggleValue = 0;

    const playerObj = (letter) => {
        let playerName = "";
        let _playerSelection = [];
        let totalWins = 0;
        const boardLetter = letter;

        const addSelection = (selection) => {
            _playerSelection.push(selection)
            _toggleValue += 1;
        }

        const resetSelection = () => {
            _playerSelection = [];
        };

        const getSelection = () => {
            return _playerSelection;
        };

        return {playerName, totalWins, boardLetter, addSelection, getSelection, resetSelection}
    }

    let playerOne = playerObj("X");
    let playerTwo = playerObj("O");

    let getCurrentPlayer = () => {
        return _toggleValue % 2 === 0? playerOne : playerTwo;
    }

    let getNextPlayer = () => {
        return _toggleValue % 2 !== 0? playerTwo : playerOne;
    }

    let isWinner = (player) => {
        const playerSelection = player.getSelection();
        return _winningBoards.some((winningArray) =>
            winningArray.every((square) => playerSelection.includes(square)))
    }

    function resetToggleValue() {
        _toggleValue = 0;
    }

    function getToggleValue() {
        return _toggleValue;
    }

    function resetGameState() {
        playerOne.totalWins = 0;
        playerTwo.totalWins = 0;
        playerOne.resetSelection();
        playerTwo.resetSelection();
        resetToggleValue();
    }

    return {playerTwo, playerOne, getCurrentPlayer, getNextPlayer, isWinner, resetToggleValue, resetGameState, getToggleValue}
}

export { gameBoard }