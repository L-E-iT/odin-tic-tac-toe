const GamePlayer = (name) => {
    name = this.name;
    let score = 0;

    return {name, score}
}

const submitButton = document.querySelector("input[type='submit']")
const gameBox = document.querySelectorAll(".game-box")
let toggleValue = -1;

function toggleDOM(e) {
    e.preventDefault()
    const gameContainer = document.querySelector(".game-container")

    const value = gameContainer.style.getPropertyValue("visibility") === "visible" ? "hidden": "visible"
    gameContainer.style.setProperty("visibility", value)
}

function selectRandomLetter(e) {
    if (e.target.textContent !== "") {
        return;
    }
    e.target.textContent = toggleValue === 1 ? "X" : "O"
    toggleValue *= -1
}

gameBox.forEach((box) => {
   box.addEventListener("click", selectRandomLetter)
});

submitButton.addEventListener("click", toggleDOM)