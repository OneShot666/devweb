/* Script dans content */

console.log("Js reductor functions loading...");                                // ! To remove at the end

// const url_form = document.getElementById('url_form');
const url_long = document.getElementById('url_to_reduct');
const lgr = document.getElementById('lgr');
const clear_url = document.getElementById('clear_url');
const reduct_button = document.getElementById('reduct_button');
const reset_button = document.getElementById('reset_button');
const short_url_div = document.getElementById('short_url_div');
const error_div = document.getElementById('error_div');

let lgr_default = 5;
let lgr_min = 3;
let short_url = '';

function checkValidUrl(url) {                                                   // check if url is valid
    try { new URL(url); return true; } catch (e) { return false; }
}

function generateShortUrl(url, lgr=lgr_default) {                               // code url in base64
    return btoa(url).substring(0, lgr);
}

reduct_button.addEventListener("click", async function (e) {                    // Give reduced url
    e.preventDefault();                                                         // Prevent from default behavior

    console.log("ui");
    error_div.innerHTML = "";
    const url_value = url_long.value;
    const lgr_value = lgr.value;
    if (url_value == "" || url_value == null) { error_div.innerHTML += "Veuillez insérer une url.<br>" }
    if (!checkValidUrl(url_value)) { error_div.innerHTML += "Url invalide.<br>" }
    if (lgr_value == "" || lgr_value <= lgr_min) { 
        error_div.innerHTML += "Veuillez insérer une longueur d'url appropriée.<br>" 
    }
    if (error_div.innerHTML == "") {                                            // if no error return
        short_url = generateShortUrl(url_value, lgr_value);
        short_url_div.innerHTML = `Url réduite : <a id="link" href="${short_url}" target="_blank">
                                  <button id="button_to_copy" class="reduce_link">${short_url}</button></a>
                                  <img id="to_copy" class="copy" src="reduction/images/copy.svg" title="Copier">`;

        const to_copy = document.getElementById('to_copy');
        const button_to_copy = document.getElementById('button_to_copy');

        to_copy.addEventListener("click", async function () {                                 // Add url to clipboard
            const text = button_to_copy.textContent;
            await navigator.clipboard.writeText(text).then(() => { }, (error) => { console.error(error); });
            alert(`Url copiée dans le presse-papier.`);
        });

        // Requete vers le serveur
        let request = await (await fetch("http://localhost:8000/reduction", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ full_url: url_value, shorten_url: short_url })
        })).json();

        console.log(request);
    }
});

reset_button.addEventListener("click", function () {                            // Reset values
    lgr.value = lgr_default;
    short_url_div.innerHTML = "";
    error_div.innerHTML = "";
});

clear_url.addEventListener("click", function () {                               // Clear url input
    url_long.value = "";
})

url_long.addEventListener("input", function () {                                // Make cross visble
    if (url_long.value !== '') { clear_url.style.opacity = 1; }
    else { clear_url.style.opacity = 0.2; }
})

console.log("Js reductor functions loaded.");                                   // ! To remove at the end
