"use strict";
console.info("Chaining functions loading...");

const inc = (x) => {
    console.log(`inc(${x})`);
    return x + 1;
};

console.info("Start");
Promise.resolve(1)
    .then(inc)
    .then((_) => Promise.reject(new Error("Broken")))
    .then(inc)                                                                  // Ne s'afficher pas
    .catch((err) => {
        console.error(err);
        return 42;
    })                                                                          // Retourne 42
    .then(inc)
    .finally(() => console.log("Done"));
console.info("End");

console.info("Chaining functions loaded !");
