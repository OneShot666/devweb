import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import logger from "loglevel";

const host = "localhost";
const port = 8000;

const app = express();

if (app.get("env") === "development") app.use(morgan("dev"));                   // Active le middleware morgan

app.set("view engine", "ejs");                                                  // Utilise EJS comme moteur par défaut

logger.setLevel(logger.levels.DEBUG);                                           // Permet un affichage plus propre

app.use(express.static("static"));

app.get("/random/:nb", async function (request, response, next) {
    const length = Number.parseInt(request.params.nb, 10);                      // Récupère nombre
    if (! Number.isNaN(length)) {                                               // Vérifie si nombre est un nombre
        const contents = Array.from({ length })
            .map((_) => `${Math.floor(100 * Math.random())} `);
            // .join("\n");
        response.render("random", {numbers: contents, 
            welcome: `Il y a ${length} nombre${(length > 1) ? 's' : ''} 
            aléatoire${(length > 1) ? 's' : ''} généré${(length > 1) ? 's' : ''}`});    // New handler de random
    } else {
        next(createError(400));
    }
});

app.use((request, response, next) => {
    logger.debug(`default route handler : ${request.url}`);
    return next(createError(404));
});

app.use((error, _request, response, _next) => {
    logger.debug(`default error handler: ${error}`);
    const status = error.status ?? 500;
    const stack = app.get("env") === "development" ? error.stack : "";
    const result = { code: status, message: error.message, stack };
    return response.render("error", result);
});

const server = app.listen(port, host);

server.on("listening", () =>
    logger.info(`HTTP listening on http://${server.address().address}:${server.address().port} 
        with mode '${process.env.NODE_ENV}'`,),
);

logger.info(`File ${import.meta.url} executed.`);
