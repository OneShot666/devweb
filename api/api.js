"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */

const $output = document.getElementById("output");
const $fileSelector = document.getElementById("file-selector");
const $goButton = document.getElementById("go-button");
const $progressBar = document.getElementById("progress-bar");
const $progressNb = document.getElementById("progress-number");

function checkResponseStatus(response) {
    if (response.ok) return response;
    throw new Error(`${response.status} (${response.statusText})`);
}

function updateProgress(current, total, text) {
    $progressBar.value = current;
    $progressBar.max = total;
    $progressNb.textContent = `${current} / ${total}`;
    if (text != null) $output.innerHTML += `${text}<br/>`;
}

function doProgressTimer() {
    let index = 1;
    let total = 128;
    let timer = 100 * Math.random();
    const progress = setInterval(() => {
        if (index <= total) {
            updateProgress(index, total, `Progression: ${index} / ${total}`)
            index++;
        } else {
            clearInterval(progress);
        }
        console.log(index);
    }, timer);
}

async function downloadAndCheck() {
    $output.innerHTML = "";
    try {
        const url = new URL(`data/${$fileSelector.value}`, window.location);
        console.debug(url);
        const resp = await fetch(url);
        const json = await resp.json();
        updateProgress(0, json.length, "Checking !");
        console.log("Démarrage du téléchargement.");

        // for (const item of json) {
            // const response = await fetch(item.url);
            // const result = await response.text();
        // }
        for (const item of json) {
            const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
            const result = json[item].url.match(regex);
            const api = `https://api.github.com/repos/${resultats[1]}/${resultats[2]}`;
            const git_response = await fetch(api);
            console.log(git_response.ok);
            updateProgress(item, json.length);
        }
    } catch (error) {
        $output.innerHTML = error;
        console.error(error);
    }
}

// $goButton.addEventListener("click", doProgressTimer);
$goButton.addEventListener("click", downloadAndCheck);
