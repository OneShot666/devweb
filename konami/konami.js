"use strict";
console.info("Js functions loading...");

/* Exercice 1 : Toggling */
const $style = document.createElement("style");
$style.innerText = ".red_bg {background-color: red }";                         // Add css to color bg red
document.head.appendChild($style);

let count = 0;
const $button = document.querySelector("#toggling");
$button.addEventListener("click", function(evt) {
    count++;
    console.log("Bouton apppuyé ! (" + count + "/10)");
    this.classList.toggle('red');
    if (count >= 10) {
        this.disabled = "true";
    }
});

const $reset = document.querySelector("#reset");
$reset.addEventListener("click", function(evt) {
    count=0;
    console.log("Bouton réinitialisé : (" + count + "/10)");
    $button.removeAttribute("disabled");
});

/* Exercice 2 : Affichage d'images */
const $links = document.querySelectorAll("a");                  // Selection tous les liens dans le fichier html
const $img_container = document.querySelector("#image-container");
const $image = document.createElement("img");
$img_container.appendChild($image);

for (const $link of $links) {
    if ($link.className == "image_to_display") {
        $link.addEventListener("click", function(event) {
            event.preventDefault();
            $image.src = this.href;
        })
    }
};

/* Exercice 3 : Konami */
const konamiCode = [
"ArrowUp",
"ArrowUp",
"ArrowDown",
"ArrowDown",
"ArrowLeft",
"ArrowRight",
"ArrowLeft",
"ArrowRight",
"b",
"a"];

let countValidKey = 0;
document.onkeydown = function (event) {                                         // Check if user enter the right combinaison
    console.log(event.key);
    if (event.key === konamiCode[countValidKey]) {
        countValidKey++;
        if (countValidKey === konamiCode.length) {
            alert("Konami code réussi !");
            countValidKey = 0;
        }
    } else { countValidKey = 0; }
};

/* Manage with display */
document.addEventListener("DOMContentLoaded",
    function () {
        /* Exercice 1 : Toggling */
        let input1 = document.getElementById("input1");

        document.getElementById("toggling").onclick = function () { input1.value = count + " / 10"; };
        document.getElementById("reset").onclick = function () { input1.value = count + " / 10"; };
    },
    false,
);

console.info("Js functions loaded !");
