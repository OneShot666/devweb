"use strict";

console.info("Js functions loading...");

function formDataToJSON(formElt) {
    // convertit un formulaire en objet JSON
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    // https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries

    const formData = new FormData(formElt);
    return Object.fromEntries(formData.entries());
}

document.querySelector("form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    alert(`Vous avez cliqué sur un ${ev.target.tagName}, le contenu est ${JSON.stringify(formDataToJSON(ev.target))}`);
});

const $bookmarksGo = document.querySelector("#bookmarks-go");
const $bookmarksList = document.querySelector("#bookmarks-list");

$bookmarksGo.addEventListener("click", async () => {
    try {
        const url = 'data/fetch.json';
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            // console.log(json);
            let item;                                                           // Retourne erreur sinon
            let html = '';                                                      // Return undefined au debut sinon
            // console.log("Affichage des liens");
            for (item of json) {
                html += `<li><a href="${item.uri}" class="link"
                style="${item.status >= 200 && item.status <= 299 ? '' : 'text-decoration: line-through;'}"
                target="_blank">${item.title}</a></li>`;
            }
            $bookmarksList.innerHTML = html;
            initLinksListener();
        } else {
            console.log("Erreur status !");
        }
    } catch (error) {
        console.log(error);
    }
});

function initLinksListener() {
    const $links = document.querySelectorAll('.link');
    $links.forEach(($link) => {
        $link.addEventListener('click', (event) => {
            if (!confirm('Allez sur ce lien ?')) {
                event.preventDefault();
            }
        });
    });
}

console.info("Js functions loaded !");
