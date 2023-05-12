const telaJogavel = document.querySelector(".telaJogavel");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".melhorScore");
const controles = document.querySelectorAll(".controles i")



let gameOver = false;
let foodX = 13, foodY = 10;
let cobraX = 5, cobraY = 10;
let velX = 0, velY = 0;
let corpoCobra = [];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("melhorScore") || 0;
highScoreElement.innerText = `Melhor Pontuação: ${highScore}`

const trocaLugarComida = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    alert("Fim de Jogo! ")
    clearInterval(setIntervalId)
    location.reload();
}
const trocarDirecao = (e) => {
    if (e.key === "ArrowUp" && velY != 1) {
        velX = 0;
        velY = -1;
    } else if (e.key === "ArrowDown" && velY != -1) {
        velX = 0;
        velY = 1;
    }
    else if (e.key === "ArrowLeft" && velX != 1) {
        velX = -1;
        velY = 0;
    }
    else if (e.key === "ArrowRight" && velX != -1) {
        velX = 1;
        velY = 0;
    }

}

controles.forEach(key => {
    key.addEventListener("click", () => trocarDirecao({ key: key.dataset.key }))
});

const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style=" grid-area:${foodY}/${foodX}"></div>`

    if (cobraX === foodX && cobraY === foodY) {
        trocaLugarComida();
        corpoCobra.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("melhorScore", highScore)
        scoreElement.innerText = `Pontuação: ${score}`
        highScoreElement.innerText = `Melhor Pontuação: ${highScore}`
    }
    for (let i = corpoCobra.length - 1; i > 0; i--) {
        corpoCobra[i] = corpoCobra[i - 1];

    }

    corpoCobra[0] = [cobraX, cobraY];


    cobraX += velX;
    cobraY += velY;

    if (cobraX <= 0 || cobraX > 30 || cobraY <= 0 || cobraY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < corpoCobra.length; i++) {
        htmlMarkup += `<div class="cobra" style=" grid-area: ${corpoCobra[i][1]}/${corpoCobra[i][0]}"></div>`

        if (i !== 0 && corpoCobra[0][1] === corpoCobra[i][1] && corpoCobra[0][0] === corpoCobra[i][0]) {
            gameOver = true;
        }
    }
    telaJogavel.innerHTML = htmlMarkup;

}
trocaLugarComida();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", trocarDirecao);