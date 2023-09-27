// CC1
"use strict";

console.log("Chargement des fonctions...");

// -----------------------------------------------------------------------------
const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");
const $error = document.getElementById("error");
const $output = document.getElementById("output");
const $result = document.getElementById("result");

var sentences = ["La rage n'est pas la solution mon fils.",
                "Tu n'es pas prêt, petit scarabée !",
                "Pour trouver la force, de patience tu dois t'armer.",
                "Mais lâche de bouton, bon sang !",
                "Ce n'est pas en rageant que vous trouverez la solution..."]

let secretMessage = 0;
let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {                                                     // reset game
    console.log("Lancement du jeu !");
    secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
    maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
    nbGuesses = 0;
    $numUsr.value = "";
    $guessBtn.disabled = "";                                                    // Allow user to guess number
    $error.innerHTML = "";
    $result.innerHTML = "";
    if ($numUsr.value == "") { secretMessage ++; }
    if (secretMessage >= 10) {
        var index = Math.floor(Math.random() * sentences.length);
        var text = sentences[index];
        $output.innerHTML = text;
        secretMessage = 0;
    } else { $output.innerHTML = ""; }
}

function guessNumber() {
    if ($numUsr.value == "" || $numUsr.value == null || $numUsr.value <= 0) {   // Check input value
        $error.innerHTML = "Veuillez entrer un nombre positif !<br>";
    } else {
        $error.innerHTML = "";
        nbGuesses += 1;
        if ($numUsr.value == secretNumber) {                                    // if user find right number
            $guessBtn.disabled = 'true';
            // $startBtn.disabled = 'true';                                     // disabled game from now on
            // console.log("Arrêt du jeu !");
            $result.innerHTML = `Félicitations ! Vous avez trouvé en ${nbGuesses} essais.<br>
            Le nombre à trouver était : ${secretNumber}`;
            $result.style.color = "green";
        } else {
            if ($numUsr.value > secretNumber) { $output.innerHTML += `Trop haut ! (${$numUsr.value})<br>`; }
            else if ($numUsr.value < secretNumber) { $output.innerHTML += `Trop bas ! (${$numUsr.value})<br>`; }
            $output.innerHTML += `Essai ${nbGuesses}/${maxGuesses}<br>`;
            $output.style.color = "black";

            if (nbGuesses >= maxGuesses) {
                $guessBtn.disabled = 'true';
                $result.innerHTML = `<br>Perdu ! Vous avez dépassé le nombre d'essais.<br>
                Le nombre à trouver était : ${secretNumber}`;
                $result.style.color = "red";
            }
        }
    }
}

$startBtn.addEventListener("click", launchGame);
$guessBtn.addEventListener("click", guessNumber);

document.onkeydown = function (event) {                                         // Check if user press enter
    if (event.key === "Enter") { guessNumber(); }
};

// -----------------------------------------------------------------------------
const $cowBtn = document.getElementById("cow-btn");
const $body = document.querySelector('body');
let url = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
let nbCow = 0;

function addCow(evt) {
    nbCow++;
    console.debug(evt.x, evt.y);
    if (nbCow > 100) { console.log(`Vous vous êtes fait vaché !`); }
    else if (nbCow < 10) { console.log(`Coords: ${evt.x}:${evt.y}`); }
    else { console.log(`Meuh: ${evt.x}:${evt.y} !`); }
    var $image = document.createElement('img');
    $image.style.left = evt.x + 'px';
    $image.style.top = evt.y + 'px';
    var angle = Math.ceil(Math.random() * 362) - 181;
    $image.style.transform = `rotate(${angle}deg)`;
    var flip = Math.ceil(Math.random() * 100);
    if (flip > 50) { $image.style.transform += `scaleX(-1)` };
    $image.src = url;
    $image.classList.add("cow");
    $body.appendChild($image);
}

function toggleCow(_evt) {                                                      // On-Off the function
    if (document.onmousedown instanceof Function) {
        document.onmousedown = null;
        console.log("Désactivation des vaches.");
        $cowBtn.value = "Vacher";
    } else {
        document.onmousedown = addCow;
        console.log("Activation des vaches !");
        $cowBtn.value = "Dévacher";
    }
}

$cowBtn.addEventListener("click", toggleCow);

console.log("Chargement terminé !");
