"use strict";

let step = [];
let userClick = [];
let started = false;
let level = 0;

const buttonColours = ["green", "red", "blue", "yellow"];
const randomNumber = Math.floor(Math.random() * buttonColours.length);
const startButton = document.querySelector(".js-start");
const againButton = document.querySelector(".js-again");
const type = document.querySelector(".js-type");
const Container = document.querySelector(".js-container");
function Again() {
  step = [];
  level;
  started = true;
  type.textContent = level ? "press star!" : "play again!";
  Container.classList.add("unclickable");
}

function userTurn() {
  Container.classList.remove("unclickable");
}

function activate(color) {
  const button = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);
  button.classList.add("activated");
  sound.play();
  setTimeout(() => {
    button.classList.remove("activated");
  }, 300);
}

function play(next) {
  next.forEach((color, index) => {
    setTimeout(() => {
      activate(color);
    }, (index + 1) * 200);
  });
}

function nextStep() {
  userClick = [];

  return buttonColours[Math.floor(Math.random() * buttonColours.length)];
}

function nextRound() {
  level++;
  Container.classList.add("unclickable");
  type.textContent = `Level ${level} `;
  const next = [...step];
  console.log(next);
  next.push(nextStep());
  play(next);

  step = [...next];
  userTurn(level);
}

function Click(currentLevel) {
  const index = userClick.push(currentLevel) - 1;
  const sound = document.querySelector(`[data-sound='${currentLevel}']`);
  sound.play();

  if (userClick[index] !== step[index]) {
    document.querySelector("body").style.backgroundColor = "red";
    return (type.textContent = `you lose😮`);
  }
  if (userClick.length === step.length) {
    if (userClick.length === 100) {
      userClick = [];
      document.querySelector("body").style.backgroundColor = "green";
      return (type.textContent = `you win😍`);
    }
    nextRound();
  }
}

function playagain() {
  level = 0;
  Container.classList.remove("unclickable");
  document.querySelector("body").style.backgroundColor = "#011f3f";
  Again();
}

startButton.addEventListener("click", nextRound);
againButton.addEventListener("click", playagain);
Container.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;
  if (tile) Click(tile);
});
