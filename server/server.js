"use strict";

/* Cours initial */
function requestListener0(_request, response) {
    response.writeHead(200);
    response.end("<html><h1>My first server!<h1></html>");
}
  
/* Question 1.1 */
function requestListener1(_request, response) {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ message: "I'm OK" }));
}

/* Question 1.2 */
// import fs from "node:fs/promises";

function requestListener2(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
    })
    .catch((error) => console.log(error));
}

/* Question 1.5 */
async function requestListener3(_request, response) {
  try {
      const contens = await fs.readFile("index.html", "utf8");
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
  } catch (error) {
      console.log(error);
      response.writeHead(500);                                                // Renvoie une erreur 500
      return response.end("Code d'erreur 500: Fichier introuvable !");
  }
}
