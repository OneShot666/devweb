import http from 'http';
import morgan from "morgan";
import express from 'express';
import jsonfile from 'jsonfile';
import { log } from 'console';
import cors from 'cors';

const host = "localhost";
const port = 8000;
const app = express();
let urls = { };

if (app.get("env") === "development") app.use(morgan("dev"));                   // Active le middleware morgan

app.set("view engine", "ejs");                                                  // Utilise EJS comme moteur par défaut

app.use(cors({origin: "*"}));                                                   // Accepte toute origine

app.listen(port, () => {
    console.log(`Express server listening on port ${port}.`);
});

app.get('/', (req, res) => {                                                    // Auto renvoie vers index.html
    res.render('../index.html');                                                // render: Dans views, visualise
});

app.use(express.static('content'));

app.post('/reduction', async (request, response) => {                           // Lancement du formulaire
    let full_url = response.params.full_url;
    let shorten_url = response.params.shorten_url;
    urls["full"] = full_url;                                                    // Add full url to content
    urls["short"] = full_url;                                                   // Add short url to content
    // console.log("Urls : " + urls);
    // response.json( { full_url: shorten_url });
    response.render("reduction", {"urls": urls, "test": "<p>Ceci est une phrase test.</p>"});
});

// app.get('/:redirection', async (request, response, next) => {
//     let redirection = request.params.redirection;
//     console.log(redirection);
//     if (urls[redirection]) { response.redirect(urls[redirection]); } 
//     else { next('404 : ' + redirection + ' not found. (' + urls[redirection] + ')'); }
//     // console.log(urls);
//     window.location.redirect(urls[redirection]);
// });
