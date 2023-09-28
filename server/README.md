CC4:

Notation:

- Envoyer le projet nomme 'NOM_Prenom_CC4'
- Verifier l'indentation
- Optimiser le projet (ne pas mettre de console.log)

1. Faire un formulaire de réduction d'url (attention au UX et UI)
1.1 Produire une url réduite à partir d'une url donnée;
1.2 Produire une url unique et fonctionnelle;
1.3 Conserver les urls dans une base de données (ou un fichier);

2. Avoir une redirection fonctionnelle (fonctionne en ligne)

Livrer le projet en ligne sur GitHub.

Déployer le projet en ligne (avec Netify, Heroku ou autre).

Eviter les erreurs.

# ------------------------------------------------------------------------------

Questions: Partie 1

1.1 Donner la liste des en-tetes de la reponse HTTP du serveur.

Outils de développeur < Network < localhost < Response Headers :

Connection:         keep-alive
Date:               Fri, 22 Sep 2023 06:56:02 GMT
Keep-Alive:         timeout=5
Transfer-Encoding:  chunked


1.2 Donner la liste des en-tetes qui ont change depuis la version precedente.

Outils de developpeur < Network < localhost < Response Headers :

Connection:         keep-alive
Content-Length:     20
Content-Type:       application/json
Date:               Fri, 22 Sep 2023 07:00:01 GMT
Keep-Alive:         timeout=5

La longueur du contenu affiche a ete pris en compte et identifie comme un fichier json.


1.3 Que contient la reponse recue par le client ?

La modification de la fonction 'requestListener' a engendre une erreur apres le lancement du serveur.
Le client ne recoit donc rien et retourne un message d'erreur.


1.4 quelle est l'erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d'erreur affiché.

Erreur retournee par la console :
[Error: ENOENT: no such file or directory, open 'C:\Xampp\htdocs\devweb\server\__index.html'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Xampp\\htdocs\\devweb\\server\\__index.html'
}
Sur https://nodejs.org/api/errors.html, la documentation indique que cette erreur s'affiche lorsque un fichier ou
un dossier n'est pas trouvé en fonction de l'emplacement donne.


1.5 Donner le code de requestListener() modifié avec gestion d'erreur en async/await.

Code sur server-https.mjs : 
async function requestListener(_request, response) {
    try {
        const contens = await fs.readFile("index.html", "utf8");
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        return response.end(response.contens);
    } catch (error) {
        console.error(error);
        response.writeHead(500);                                                // Renvoie une erreur 500
        return response.end("Code d'erreur 500: Fichier introuvable !");
    }
}


1.6 Indiquer ce que cette commande a modifié dans votre projet.

Cette commande a ajouté les packages cross-env et nodemon.
Elle les ajoute en tant que dépendances dans le fichier package.json.
Elles ne seront donc utilisées que pendant le développement du projet.


1.7 Quelles sont les différences entre les scripts http-dev et http-prod ?

Pour le lancement avec http-dev, le serveur se met automatiquement à jour grâce à nodemon.
Tandis que pour http-prod, le serveur n'est mis à jour.


1.8 Donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.

Status code pour http://localhost:8000/index.html : 200

Status code pour http://localhost:8000/random.html : 200

Status code pour http://localhost:8000/ : 404

Status code pour http://localhost:8000/dont-exist : 404


Questions: Partie 2

2.1 Donner les URL des documentations de chacun des modules installés par la commande précédente.

Url de la documentation de express : https://expressjs.com/fr/4x/api.html

Url de la documentation de http-errors : https://www.npmjs.com/package/http-errors

Url de la documentation de loglevel : https://www.npmjs.com/package/loglevel

Url de la documentation de morgan : https://www.npmjs.com/package/morgan


2.2 Vérifier que les trois routes fonctionnent.

Les 3 urls fonctionnent à condition d'avoir le dossier node_modules et le fichier index.html dans le même dossier 
dans laquelle est executée la commande.


2.3 Lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?

localhost : 
Accept-Ranges:      bytes
Cache-Control:      public, max-age=0
Connection:         keep-alive
Content-Length:     2293
Content-Type:       text/html; charset=UTF-8
Date:               Thu, 28 Sep 2023 00:17:09 GMT
Etag:               W/"8f5-18ad8c33265"
Keep-Alive:         timeout=5
Last-Modified:      Wed, 27 Sep 2023 22:29:45 GMT
X-Powered-By:       Express

localhost/index.html : 
Accept-Ranges:      bytes
Cache-Control:      public, max-age=0
Connection:         keep-alive
Content-Length:     2293
Content-Type:       text/html; charset=UTF-8
Date:               Thu, 28 Sep 2023 00:15:18 GMT
Etag:               W/"8f5-18ad8c33265"
Keep-Alive:         timeout=5
Last-Modified:      Wed, 27 Sep 2023 22:29:45 GMT
X-Powered-By:       Express

localhost/random/:nb : 
Connection:         keep-alive
Content-Length:     840
Content-Type:       text/html; charset=utf-8
Date:               Thu, 28 Sep 2023 00:18:29 GMT
Etag:               W/"348-+m18fkLjlNXe+WtBAWTFrg4uvTI"
Keep-Alive:         timeout=5
X-Powered-By:       Express

Les différences sont que les programmes sont maintenant lancés avec Express.


2.4 quand l'événement listening est-il déclenché ?

L'évènement 'listening' est déclenché à la fin du programme lorsque le fichier a fini de charger.


2.5 Indiquer quelle est l'option (activée par défaut) qui redirige / vers /index.html ?

L'option activée par défaut permettant la redirection vers le fichier index.html est le paramètre 'index'
dans la fonction static de express. Cela peut se représenter comme suit : express.static(index='index.html');


2.6 Visiter la page d'accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier style.css ? Justifier.

Lors du rafraichissement de la page, le code http pour le fichier style.css est : Status 304.

Lors du rafraichissement forcé de la page, le code http est : Status 200.

En activant le cache, le serveur nous renvoie un status 304 car il possédait déjà le fichier style.css en cache.
Tandis qu'en forçant le rafraichissmeent totale de la page, le cache a été vidé est un simple statuts 200 a été 
retourné pour indiquer que le fichier a bien été trouvé.


2.7 Vérifier que l'affichage change bien entre le mode production et le mode development.

La réponse entre le mode production et le mode développement est que le développement fourni un retour d'erreur 404
plus complet et détaillé.


Conclusion : Téléchargement du projet en ligne...

TP5 fini, en avant le TP6 !
