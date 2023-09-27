"use strict";
console.info("Js functions loading...");

/* Exercice 1 : Chrono */
const $font_size = document.querySelector("#size-selector");
const $font_button = document.querySelector("#set_font_size");

$font_button.addEventListener("click", function () { console.log(`${$font_size.value}px`); });

function chrono(fct) {
    return function (...args) {
        const start = Date.now();
        const result = fct(...args);
        const end = Date.now();
        console.info(`${fct.name}(...) executed in ${end - start}ms`);
        return result;
    };
}

function calcul(x, y, z) { return 2 * x - y + 3 * z; }

function reduction(arr) { return arr.reduce((a, b) => a + b, 0); }

/*
console.log(calcul(1, 2, 3));                                                   // Teste fonction calcul (chrono)
const _calcul_chrono = chrono(calcul);
console.log(_calcul_chrono(1, 2, 3));
setTimeout(() => _calcul_chrono(1, 2, 3), 1000);

let tab = [2, 5];
console.log(reduction(tab));                                                    // Teste fonction reduction (chrono)
const _reduction_chrono = chrono(reduction);
console.log(_reduction_chrono(tab));
setTimeout(() => _reduction_chrono(tab), 1000);
*/

/* Exercice 2 : Autres */
function once(fct) {
    let cache;
    return function (...args) {
        console.log(cache);
        if (cache === undefined) { cache = fct(...args); }
        return cache;
    };
}

function undef() {
  return undefined;
}

function maybe(fct, def) {
  let result;
  let cache;
  return (...args) => {
    let result2;
    if (cache === undefined) {
      result = fct(...args);
      if (result === undefined) {
        result2 = def;
      } else {
        result2 = result;
      }
      cache = result2;
    }
    return cache;
  }
}

const _reduction = once(reduction);                                             // Teste fonction once()
console.log(_reduction([1, 2]));
console.log(_reduction([1, 2]));
const _reduction2 = maybe(undef, 87);                                             // Teste fonctions maybe() & undef()
console.log(_reduction2([1, 2]));
console.log(_reduction2([1, 2]));

/* Exercice 3 : Python */
document.onkeydown = function (event) {
    console.log("Keyboard: " + event.key);                                      // Print key
};

console.info("Js functions loaded !");
