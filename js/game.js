import { fetchAllPokes } from "./ApiData.js";
import { initializeBoard, circles } from "./Board.js";
import { validateGame,score } from "../js/validation.js";
import { startGameTimer, hasTime } from "./timer.js";
let playAgainBtn = document.querySelector(".playAgainBtn");
let scoreEl = document.querySelector(".score");
let shuffledPoke;
for (let i = 0; i < 12; i++) {
    circles[i].addEventListener("click", function (event) {
        event.stopPropagation();
        circles[i].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shuffledPoke[i].id}.png`;
        if (hasTime) {
            let score = validateGame(circles[i], i);
            updateScore(score);
        }
        if (!hasTime) {
            alert("game over");
            disableBoard();
        }
    });
}
let setGame = () => {
    let pokeMons = JSON.parse(localStorage.getItem("pokeList"));
    shuffledPoke = initializeBoard(pokeMons);
    startGameTimer();
};

function disableBoard() {
    console.log("in no time");
    console.log(circles);
    for (let i = 0; i < 12; i++) {
        circles[i].src = "../images/pikapika.jpg";
    }
}
let updateScore = (score) => {
    score=0;
    scoreEl.innerHTML = score;
};

playAgainBtn.addEventListener("click", function () {
    fetchAllPokes();
    updateScore(0);
    setGame();
    localStorage.setItem("visible", JSON.stringify(0));
    for (let i = 0; i < 12; i++) {
        circles[i].src = "../images/PokeBall.png";
    }
});

setGame();
