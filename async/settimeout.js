"use strict";
console.info("SetTimeOut functions loading...");

function timedValue(value, delay) {
    function executor(resolve, reject) {
        setTimeout(() => resolve(value), delay);
    }

    return new Promise(executor);
}

const p = timedValue("Success!", 1000);

p.then((str) => "OK! " + str)                                                   // Enchainement de 3 callbacks sans imbrication
    .then((str) => str + " Done!")
    .then((str) => console.log(str));

timedValue("B", 1000).then(console.log);                                        // Effectue en parallèle

timedValue("A", 1000)                                                           // Enchainement de timers
    .then((r) => timedValue(r + " Done!", 1000))
    .then(console.log);

// on pourrait introduire des variables intermédiaires comme suit
// pour voir les promesses rendues par chaque `.then`
// p1 = p.then((str) => "OK! " + str)
// p2 = p1.then((str) => str + " Done!")
// p3 = p2.then((str) => console.log(str));

console.info("SetTimeOut functions loaded !");
