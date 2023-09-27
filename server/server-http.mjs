import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(_request, response) {
  try {
    const contens = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    return response.end(response.contens);
  } catch (error) {
    console.error(error);
    response.writeHead(500); // Renvoie une erreur 500
    return response.end("Code d'erreur 500: Fichier introuvable !");
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

console.log("NODE_ENV =", process.env.NODE_ENV);
