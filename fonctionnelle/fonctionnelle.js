"use strict";

console.log("Functions loading...");

// Même exo que le TP 2 : Dom
const $anchors = document.querySelectorAll("ul#images-list > li > a");
const $display = document.getElementById("image-container");

function handler(element) {
    this.parentNode.remove();
}

function handler2(element) {
    element.remove();
}

function addImage(evt) {
    evt.preventDefault();
    const $div = document.createElement("div");                                 // Create div

    const $img = document.createElement("img");                                 // Add the image
    $img.src = evt.target.href;                                                 // Clue: ici, on pourrait utiliser this ou autre
    $div.appendChild($img);

    const $btn = document.createElement("button");                              // Add the button
    $btn.innerHTML = "X";
    $div.appendChild($btn);

    /*              Différentes déclarations pour le même but                   */
    // $btn.addEventListener("click", () => $div.remove();));
    // $btn.addEventListener("click", handler);
    $btn.addEventListener("click", () => handler2($div));

    $display.appendChild($div);
}

// pour chaque lien
for (const $a of $anchors) {
    $a.addEventListener("click", addImage);
}

console.log("Functions loaded !");
