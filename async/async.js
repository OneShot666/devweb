"use strict";
console.info("Async functions loading...");

const $input = document.getElementById("input");
const $fetchPromiseButton = document.getElementById("fetch-promise-btn");
const $fetchAwaitButton = document.getElementById("fetch-await-btn");
const $resetButton = document.getElementById("reset-btn");
const $output = document.getElementById("content");


// Charge le contenu d'un fichier json et l'affiche
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
function fetchPromise() {
    const url = new URL(`data/${$input.value.trim()}`, window.location);
    // Download fichier et affiche son contenu dans $output
    // Traiter les erreurs réseaux (code HTTP différent de 200-299)
    fetch(url).then(resp => {
        if (resp.status >= 200 && resp.status <= 299) {
            resp.text().then(data => {                       // use "resp.text()" : affiche data en texte
                console.info(data);
                $output.innerHTML = data;
            });
            return;
        }
        console.error("Erreur status");
        $output.innerHTML = "Erreur status";
    })
    .catch(error => {
        console.error("Erreur réseau",  error); 
        $output.innerHTML = "Erreur status"; 
    });
}


// Version async/await de loadJSON()
async function fetchAwait() {
    try {
        const url = new URL(`data/${$input.value.trim()}`, window.location);
        const resp = await fetch(url);
        if (resp.status >= 200 && resp.status <= 299) {
            const data = await resp.text();
            console.info(data);
            $output.innerHTML = data;
        } else {
            console.error("Erreur status");
            $output.innerHTML = "Erreur status";
        }
    } catch(error) {
        console.error("Erreur réseau",  error); 
        $output.innerHTML = "Erreur status"; 
    };
}


/********************** EVENT HANDLERS ***********************/
$fetchPromiseButton.addEventListener("click", fetchPromise);
$fetchAwaitButton.addEventListener("click", fetchAwait);
$resetButton.addEventListener("click", () => ($output.innerHTML = ""));


console.info("Async functions loaded !");
    