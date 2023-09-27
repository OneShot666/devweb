"use strict";
console.info("Js functions loading...");

/* Exercice 1 : Handlers */
const $output1 = document.getElementById("output1");
const $input1 = document.getElementById("input1");
const $eval1 = document.getElementById("eval1");
const $reset1 = document.getElementById("reset1");

function work1() {
    $output1.innerHTML += `Carré + 1 (${$input1.value}) : ${$input1.value ** 2 + 1}<br/>`;
}

$eval1.addEventListener("click", work1);
$reset1.addEventListener("click", () => { $output1.innerHTML = '<br/>'; });

/* Exercice 2 : Alarms */
const $eval2 = document.getElementById("eval2");

function work2() {
    console.log("Start"); // (A)
    setTimeout(() => console.log("Call back #1"), 0,);                              // (CB1)
    console.log("Middle"); // (B)
    setTimeout(() => console.log("Call back #2"), 0,);                              // (CB2)
    console.log("End"); // (C)
}

$eval2.addEventListener("click", work2);

/* Exercice 3 : Blocking code */
const $eval3 = document.getElementById("eval3");

function work3() {
    const s = new Date().getSeconds();

    setTimeout(function () {
        console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
    }, 0);

    while (true) {
        if (new Date().getSeconds() - s >= 2) {
            console.log("Good, looped for 2 seconds");
            break;
        }
    }
}

$eval3.addEventListener("click", work3);

/* Exercice 4 : Fonctions asynchrones */
const $eval4_t1 = document.getElementById("eval4_t1");
const $eval4_t2 = document.getElementById("eval4_t2");
const $eval4_t3 = document.getElementById("eval4_t3");
const $eval4_classic = document.getElementById("eval4_classic");
const $output4 = document.getElementById("output4");

function work4(x) {
    console.info(`work4(${x})`);
    return x ** 2;
}

setTimeout(work4, 0);                                                           // KO: pas de paramètre
setTimeout(work4(2), 0);                                                        // KO: typeof(work(2)) == "number"
setTimeout(function () { return work4(3); }, 0);                                // OK! avec function explicite
setTimeout(() => work4(4), 0);                                                  // OK! avec fat arrow

// tentative 1
function tentative1() {
    function async_work(n) {
        return setTimeout(() => work4(n), 0);
    }

    const r1 = async_work(12);
    console.log(r1);
}

// tentative 2
function work4t2(x, cb) {                                                       // cb: callback
    console.info(`work4t2(${x})`);
    cb(x ** 2);
    console.info(`work4t2 done`);
}

function async_work4t2(n, cb) {
    return setTimeout(() => work4t2(n, cb), 0);
}

function tentative2() {
    const r1 = async_work4t2(3, (r) => console.log(r));
}

// tentative 3
function async_work4t3(n, cb) {
    return setTimeout(() => cb(n ** 2), 0);
}

function tentative3() {
    async_work4t3(3, (r1) => {
        console.log(r1);
        async_work4t3(r1, (r2) => {
            console.log(r2);
            async_work4t3(r2, (r3) => console.log(r3));
        });
    });
}

// callback classic
function callback(error, retval) {
    if (error) {
        console.error(error);                                                   // traiter error, avec un throw par exemple
        return;                                                                 // arrête le flot
    }

    console.log(retval);                                                        // traiter retval
}

function asyncfunction(params, callback) {
    console.log("error: require is not defined (line 122)");
    $output4.innerHTML += "Cette fonction sert seulement d'exemple.";
    return 0;

    const fs = require("fs");
    const mypath = "async-node-fs-readfile.js";

    console.log("Lancement lecture asynchrone file...");
    fs.readFile(mypath, "utf8", function (err, data) {
        if (err) { return console.error(err); }

        console.log(`>>> ${data} <<<`);
    });

    console.log("...lecture lancée");
}

$eval4_t1.addEventListener("click", tentative1);
$eval4_t2.addEventListener("click", tentative2);
$eval4_t3.addEventListener("click", tentative3);
$eval4_classic.addEventListener("click", asyncfunction);

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

function doom() {                                                               // !!! pyramid ne recupere pas les vars
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
