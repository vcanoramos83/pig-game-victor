import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
    <div class="game">
      <div class="player player--0 player--active">
        <h2 class="name" id="name--0">Player 1</h2>
        <p class="score" id="score--0">0</p>
        <h2 class="current-score" id="current--0">0</h2>
      </div>
      <div class="player player--1">
        <h2 class="name" id="name--1">Player 2</h2>
        <p class="score" id="score--1">0</p>
        <h2 class="current-score" id="current--1">0</h2>
      </div>
      <button class="btn btn--new" id="btnNew">New game</button>
      <button class="btn btn--roll" id="btnRoll">Roll dice</button>
      <button class="btn btn--hold" id="btnHold">Hold</button>
      <img src="/dice-1.png" alt="Playing dice" class="dice">
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))

// Seleccionar elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Función de inicialización
const init = function () {
    // Estado inicial del juego
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // Reiniciar elementos visuales
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    // Reiniciar clases
    diceEl.style.display = 'none';
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

// Llamar a la inicialización al cargar la página
init();

// Cambiar jugador
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Tirar dado
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generar número de dado aleatorio
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Mostrar dado
        diceEl.style.display = 'block';
        diceEl.src = `/dice-${dice}.png`;

        // 3. Verificar si el dado es 1
        if (dice !== 1) {
            // Agregar puntuación al puntaje actual
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Cambiar al siguiente jugador
            switchPlayer();
        }
    }
});

// Guardar puntuación
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Agregar puntuación actual al puntaje del jugador activo
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Verificar si el jugador ganó (puntuación >= 100)
        if (scores[activePlayer] >= 100) {
            // Terminar juego
            playing = false;
            diceEl.style.display = 'none';
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            // Cambiar al siguiente jugador
            switchPlayer();
        }
    }
});

// Reiniciar juego
btnNew.addEventListener('click', init);
