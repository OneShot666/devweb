"use strict";                           // Affiche des erreurs plus précises

/* -------------------------- Informations ---------------------------------- */
// Les vars 'let' n'existe que dans leur bloc défini : {}
// Ne pas use 'var' (sauf pour global ?)
console.log("Functions loading...");

for (var i = 5; i >=0; i--) {
console.log(i);
}

let nb_meuh = 0;

// counter() : renvoie fonction 'f (n)' : renvoie n au carré et affiche nb d’appels de f à chaque use°.
function counter() {
    let count = 0;
    return function f (n) {
        console.log(count);
        count++;
        return n ** 2;
    }
}

// + Variante avec compteur commun à toutes occurences de counter().
function alter_counter() {
    let count = 0;
    return function f (n) {
        console.log(count);
        count++;
        return n ** 2;
    }
}

let counter01 = counter();
let counter02 = alter_counter();

let $test_button = document.getElementById("tester");
let $reset_button = document.getElementById("reset");
let $input_number = document.getElementById("input2");

$test_button.addEventListener("click", counter01);
$reset_button.addEventListener("click", () => $input_number.value="0");

function muggler() {
    nb_meuh++;
    console.log(`Meuh ! (x${nb_meuh})`);
}

// document.addEventListener("click", muggler);

/* -------------------- Déplacement du bloc --------------------------------- */
const root = document.documentElement;

const myDiv = document.getElementById("myDiv");
const bloc_size = getComputedStyle(root).getPropertyValue('--bloc_size');
const bloc_speed = parseInt(getComputedStyle(root).getPropertyValue('--bloc_speed'));
console.log(`Taille: '${bloc_size}'`);
console.log(`Vitesse: '${bloc_speed}'`);
let horPosition = 50;                                                           // Position horizontale bloc (en %)
let verPosition = 50;                                                           // Position horizontale bloc (en %)

function moveDiv(dir) {                                                         // Fonction pour déplacer la div
    if (dir == "up") {
        horPosition -= bloc_speed;                                              // Diminue la position horizontale
        myDiv.style.top = horPosition + "%";
    } else if (dir == "down") {
        horPosition += bloc_speed;                                              // Augmente la position horizontale
        myDiv.style.top = horPosition + "%";
    }
    if (dir == "left") {
        verPosition -= bloc_speed;                                              // Diminue la position verticale
        myDiv.style.left = verPosition + "%";
    } else if (dir == "right") {
        verPosition += bloc_speed;                                              // Augmente la position verticale
        myDiv.style.left = verPosition + "%";
    }
    console.log(`Pos: (${myDiv.style.left}, ${myDiv.style.top})`);
}

document.addEventListener("keydown", function movementManager(event) {          // Vérifie si touches enfoncées
    if (event.key === "ArrowUp") {
        moveDiv("up");
    } else if (event.key === "ArrowDown") {
        moveDiv("down");
    }
    if (event.key === "ArrowLeft") {
        moveDiv("left");
    } else if (event.key === "ArrowRight") {
        moveDiv("right");
    }
});

setInterval(document.movementManager, 100);                                     // Appelle la fonction du bloc toutes les 100ms ?

console.log("Functions loaded !");
