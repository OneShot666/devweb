import http from "node:http";
import fs from "node:fs/promises";
import { log } from "node:console";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
    response.setHeader("Content-Type", "text/html");
    try {
        const splitted_url = request.url.split("/");
        logger.info(splitted_url);
        const contents = await fs.readFile("index.html", "utf8");
        switch (splitted_url[1]) {
            case "index.html":
                response.writeHead(200);
                return response.end(contents);
            case "random.html":
                response.writeHead(200);
                return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
            case "random":
                let numbers = '';
                for (let index = 0; index < splitted_url[2]; index++) {
                    numbers += `${Math.floor(100 * Math.random())}<br>`;
                }
                response.writeHead(200);
                return response.end(`<html><p>${numbers}</p></html>`);
            default:
                response.writeHead(404);
                return response.end(`<html><p>404: NOT FOUND</p></html>`);
        }
    } catch (error) {
        logger.error(error);
        response.writeHead(500);
        return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  logger.info(`Server is running on http://${host}:${port}`);
});

logger.info("NODE_ENV =", process.env.NODE_ENV);
