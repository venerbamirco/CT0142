"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import vari
const colors = require("colors");
colors.enabled = true;
const express = require("express");
const bodyparser = require("body-parser");
const jwt = require("express-jwt");
const cors = require("cors");
//Configurazione chiavi per https
const result = require("dotenv").config();
//controllo se e possibile caricare il file .env
if (result.error) {
    console.log(("Impossibile caricare il file .env " + result.error).red);
    process.exit(-1);
}
//controllo che si possa accedere al contenuto del file .envs
if (!process.env.JWT_SECRET) {
    console.log("Errore caricamento contenuto file .env".red);
    process.exit(-1);
}
;
console.log("CREAZIONE E CONFIGURAZIONE EXPRESS".yellow);
//uso di express per routing
var app = express();
console.log("FINE CREAZIONE E CONFIGURAZIONE EXPRESS".blue);
console.log("CREAZIONE SERVER HTTP".yellow);
//import http
var ios = require("./server/httpServer")(app);
console.log("FINE CREAZIONE SERVER HTTP".blue);
console.log("CREAZIONE E CONFIGURAZIONE MIDDLEWARE".yellow);
//middleware per l autenticazione jwt
var auth = jwt({ secret: process.env.JWT_SECRET });
//middleware per parsing
app.use(bodyparser.json());
//middleware per accedere risorse remote bypassando propblema delle origini
app.use(cors());
console.log("FINE CREAZIONE E CONFIGURAZIONE MIDDLEWARE".blue);
console.log("CREAZIONE ROUTES ROOT".yellow);
//import delle varie routes di root
require("./routes/routesRoot")(app);
console.log("FINE CREAZIONE ROUTES ROOT".blue);
console.log("CREAZIONE ROUTES INSERZIONI".yellow);
//import delle varie routes delle inserzioni
require("./routes/routesInserzioni")(app, auth);
console.log("FINE CREAZIONE ROUTES INSERZIONI".blue);
console.log("CREAZIONE ROUTES MODERATORI".yellow);
//import delle varie routes dei moderatori
require("./routes/routesModeratori")(app, auth);
console.log("FINE CREAZIONE ROUTES MODERATORI".blue);
console.log("CREAZIONE ROUTES STUDENTI".yellow);
//import delle varie routes degli studenti
require("./routes/routesStudenti")(app, auth);
console.log("FINE CREAZIONE ROUTES STUDENTI".blue);
console.log("CREAZIONE ROUTES ROOT".yellow);
//import delle varie routes dei messaggi
require("./routes/routesMessaggi")(app, auth, ios);
console.log("FINE CREAZIONE ROUTES ROOT".blue);
console.log("CREAZIONE ROUTES LIBRI".yellow);
//import delle varie routes dei libri
require("./routes/routesLibri")(app, auth);
console.log("FINE CREAZIONE ROUTES LIBRI".blue);
console.log("CREAZIONE ROUTES PERSONE".yellow);
//import delle varie routes delle persone
require("./routes/routesPersone")(app);
console.log("FINE CREAZIONE ROUTES PERSONE".blue);
console.log("CREAZIONE ROUTES STATISTICHE".yellow);
//import delle varie routes delle statistiche
require("./routes/routesStatistiche")(app, auth);
console.log("FINE CREAZIONE ROUTES STATISTICHE".blue);
console.log("CREAZIONE ROUTES ROOT".yellow);
//import delle varie routes del login
require("./routes/routesLogin")(app);
console.log("FINE CREAZIONE ROUTES ROOT".blue);
console.log("CREAZIONE ROUTES ERRORI".yellow);
//import delle varie routes della gestione degli errori
require("./routes/routesErrori")(app);
console.log("FINE CREAZIONE ROUTES ERRORI".blue);
console.log("FINE CREAZIONE DI TUTTE LE ROUTES".blue);
console.log("CREAZIONE CONNESSIONE MONGODB".yellow);
//import server mongoose
require("./server/mongooseServer")().then(() => {
    console.log("FINE CREAZIONE CONNESSIONE MONGODB".blue);
    //import dei dati di prova dei messaggi
    require("./datiProva/datiProvaMessaggi")();
    //import dei dati di prova degli utenti
    require("./datiProva/datiProvaUtenti")();
    //import dei dati di prova delle inserzioni
    require("./datiProva/datiProvaInserzioni")();
    //import dei dati di prova dei libri
    require("./datiProva/datiProvaLibri")();
    console.log("SERVER AVVIATO CORRETTAMENTE".blue);
}, (err) => {
    console.log(("Non connesso a mongodb: " + err).red);
    process.exit(-1);
});
//# sourceMappingURL=main.js.map