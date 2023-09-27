"use strict";

console.log("Début du script");

/* Exercice 0 : Tutoriel */
function fibonacci(n) {
    if (n < 0) { return -1; }
    else if (n < 2) { return n; }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function factorielle(n) {
    if (n == 0) { return 1; }
    return n * factorielle(n - 1);
}

function test(entier) {
    console.log("[js] test (" + entier + ")");
    console.log("Fibonacci : " + fibonacci(entier));
    console.log("Factorielle : " + factorielle(entier));
}

/* Exercice 1 : 99 Bottles of Beer */
function bottles(beers) {
  console.log("[js] bottles (" + beers + ")");
  let res = "";

    for (let beer = beers; beer > 0; beer--) {
        var plus = beer > 1 ? "s" : "";
        res += `${beer} bottle${plus} of beer on the wall, ${beer} bottle${plus} of beer.<br>
        Take one down and pass it around, ${beer - 1} bottle${plus} of beer on the wall.<br><br>`;
    };

  return res;
}

/* Exercice 2 : fonction range */
function range(stop, start, step) {
    console.log("[js] range(" + stop + "," + start + "," + step + ")");
    const res = [];
    for (var i=start; i < stop; i+=step) {
        console.log("ui");
        res.push(i);
    }
    return res;
}

/* Exercice 3 : Calculatrice polonaise inverse */
let evaluate = function (expr) {
  console.log("[js] evaluate (" + expr + ")");
  let results = [];

  /* TODO */

  return results.pop() || 0;
};

// /!\ IMPORTANT : pour l'instant, ne regardez PAS ce qui est dessous ! /!\

document.addEventListener(
  "DOMContentLoaded",
  function () {
    /* Exercice 0 : Test */
    let output0 = document.getElementById("output0");
    let input0 = document.getElementById("input0");

    document.getElementById("eval0").onclick = function () {                    // Use function
        output0.innerHTML = test(input0.value);
    };

    /* Exercice 1 : 99 Bottles of Beer */
    let output1 = document.getElementById("output1");
    let input1 = document.getElementById("input1");

    document.getElementById("eval1").onclick = function () {                    // Display text
        output1.innerHTML = bottles(input1.value);
    };

    /* Exercice 2 : fonction range */
    let output2 = document.getElementById("output2");
    let input2stop = document.getElementById("input2stop");
    let input2start = document.getElementById("input2start");
    let input2step = document.getElementById("input2step");

    document.getElementById("reset2").onclick = function () {
      input2stop.value = 10;
      input2start.value = 1;
      input2step.value = 1;
      output2.innerHTML = "";
    };

    document.getElementById("eval2").onclick = function () {
      let stop = Number(input2stop.value);
      let start = input2start.value !== "" ? Number(input2start.value) : undefined;
      let step = input2step.value !== "" ? Number(input2step.value) : undefined;

      output2.innerHTML += "[" + String(range(stop, start, step)) + "]<br>";
    };

    /* Exercice 3 : Calculatrice polonaise inverse */
    let output3 = document.getElementById("output3");
    let input3 = document.getElementById("input3");

    document.getElementById("reset3").onclick = function () {
      output3.innerHTML = "";
    };

    document.getElementById("eval3").onclick = function () {
      let res = evaluate(input3.value);
      output3.innerHTML += String(res) + "<br>";
    };
  },
  false,
);

console.log("Fin du script");
