"use strict";
console.info("Js functions loading...");

/* Exercice 1 : Throttle */
const $output1 = document.getElementById("output1");
const $input1 = document.getElementById("input1");
const $eval1 = document.getElementById("eval1");
const $reset1 = document.getElementById("reset1");

function display() {
    const $input1 = document.getElementById("input1");
    return $input1.value;
}

function throttle(funct, delay) {
    let waiting = false;
    return function (...args) {
        if (!waiting) {
            waiting = true;
            setTimeout(() => { waiting = false; }, delay);
            return funct(...args);
        }
    };
}

$eval1.addEventListener("click", () => { $output1.innerHTML += throttle(display, 1000); });
$reset1.addEventListener("click", () => { $output1.innerHTML = '<br/>'; });

/* Exercice 2 : Resolve & Reject */
const $eval2 = document.getElementById("eval2");

function resolve(value) {
    console.log(value);
    console.log("Tout s'est bien passé !");
}

function reject(reason) {
    console.log(reason);
    console.log("Tout s'est mal passé !");
}

console.log("A");
const promise = new Promise(function() {  // (resolve, reject) {
    if (true) { resolve(3); }                                                   // succès
    else { reject("error"); }                                                   // échec
    console.info(`resolve = ${resolve}`);
    resolve(42);
});
console.log("B");
promise.then(console.log);                                                      // s'affiche en dernier
console.log("C");

// $eval2.addEventListener("click", promise);

/* Exercice 3 : Promise */
const $eval3 = document.getElementById("eval3");

promise
    .then((value) => {
        /* fulfillment */
        /* enchainé par un appel à `resolve` dans l'exécuteur */
    })
    .catch((error) => {
        /* rejection */
        /* enchainé par un appel à `reject` dans l'exécuteur */
    })
    .finally(() => {
        /* dans tous les cas  : pas de paramètre*/
    });

let inc = 0;
console.info("Start");
Promise.resolve(1)
    .then(inc)
    .then((_) => Promise.reject(new Error("Broken")))                           // Génère une erreur dans la console
    .then(inc)                                                                  // non executé
    .catch((err) => {
        console.error(err);
        return 42;
    })                                                                          // retour
    .then(inc)
    .finally(() => console.log("Done"));                                        // S'affiche de toute manière
console.info("End");

$eval3.addEventListener("click", promise);

/* Exercice 4 : Promisification */
const $eval4 = document.getElementById("eval4");
const $promisify4 = document.getElementById("promisify4");
const $output4 = document.getElementById("output4");

function timedValue(value, delay) {
    function executor(resolve, reject) {
        setTimeout(() => resolve(value), delay);
    }

    return new Promise(executor);
}

const p = timedValue(1000, "Success ! ");

function promisify(funct) {
    // wrapper (*)
    return function (...args) {
        return new Promise((resolve, reject) => {
            // custom callback/executor (**)
            function callback(err, result) {
                if (err) reject(err);
                else resolve(result);
            }
            args.push(callback); // append custom callback
            funct.call(this, ...args); // call the original function
        });
    };
}

// Enchainement de 3 callbacks sans imbrication
p.then((str) => "OK ! " + str)
    .then((str) => str + " Done ! ")
    .then((str) => console.log(str));

$eval4.addEventListener("click", timedValue(1000, "Success ! "));
// $promisify4.addEventListener("click", promisify);

/* Exercice 5 : Delay */
const $output5 = document.getElementById("output5");
const $input5 = document.getElementById("input5");
const $eval5 = document.getElementById("eval5");
const $alarm5 = document.getElementById("alarm5");
const $interval5 = document.getElementById("interval5");
const $doom5 = document.getElementById("doom5");
const $reset5 = document.getElementById("reset5");
let n = 0;

// Etape 1
function work5() {
    $output5.innerHTML += `Result : ${$input5.value ** 2 + 1}<br/>`;
    setTimeout(() => $output5.innerHTML += ' Done !', 1000 * parseInt($input5.value, 10));
}

// Etape 2
function alarm5() {
    let n = parseInt($input5.value, 10);
    for (var i = 1; i <= n; i++) {
        let valeur = n + 1 - i;
        setTimeout(() => $output5.innerHTML += `${valeur}, `, 1000 * i);
    }
    setTimeout(() => $output5.innerHTML += ` Done !<br/>`, 1000 * (n + 1));
}

// Etape 3
function interval5() {
    let n = parseInt($input5.value, 10);
    const intervalId = setInterval(() => {
        if (n > 0) { $output5.innerHTML += `${n}, `; n--; }
        else { clearInterval(intervalId); $output5.innerHTML += ` Done !<br/>`; }
    }, 1000);
}

// Etape 4
function pyramid_of_doom() {
    if (number < 1) { setTimeout(() => { $output5.innerHTML += " Done !<br/>"; }, 1000 * max); return 0; }
    let valeur = number;
    setTimeout(() => { $output5.innerHTML += `${valeur}, `; }, 1000 * (max - number));
    number--;
    pyramid_of_doom();
}

function doom() {
    let number = parseInt($input5.value, 10);
    let max = parseInt($input5.value, 10);
    pyramid_of_doom();
}

// Reset all
function reset() {
    $output5.innerHTML = '<br/>';
    let number = parseInt($input5.value, 10);
    let n = 0;
}

$eval5.addEventListener("click", work5);
$alarm5.addEventListener("click", alarm5);
$interval5.addEventListener("click", interval5);
$doom5.addEventListener("click", doom);
$reset5.addEventListener("click", reset);

/* Exercice 6 : Keyboard */
document.onkeydown = function (event) {
    console.log("Keyboard: " + event.key);                                      // Print key pressed down
};

console.info("Js functions loaded !");
