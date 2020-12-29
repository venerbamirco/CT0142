"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passporthttp = require("passport-http");
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken");
//import delle classi usate
const user = require("./../classi/User");
module.exports = function (app) {
    //gestione login
    app.get("/login", passport.authenticate("basic", { session: false }), (req, res, next) => {
        console.log("ENDPOINT GET /login".yellow);
        //creo la struttura del token
        var tokendata = {
            idUser: req.user.idUser,
            ruolo: req.user.ruolo,
            nome: req.user.nome,
            cognome: req.user.cognome,
            username: req.user.username,
            email: req.user.email,
            areaGeografica: req.user.areaGeografica,
            astePartecipate: req.user.astePartecipate
        };
        //firmo il token
        var token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log("FINE ENDPOINT GET /login".blue);
        //verifico la password dell utente se e temporanea allora restituisco flag a true
        if (user.newUser(req.user).checkPassword("Temporanea2020")) {
            return res.status(200).json({ statusCode: 200, endpoint: "/login", method: "get", error: false, message: "Login effettuato", reasons: null, token: token_signed, utente: tokendata, temp: true });
        }
        //altrimenti il flag a false
        else {
            return res.status(200).json({ statusCode: 200, endpoint: "/login", method: "get", error: false, message: "Login effettuato", reasons: null, token: token_signed, utente: tokendata, temp: false });
        }
    });
    //configurazione http basic authentication strategy tramite middleware passport
    passport.use(new passporthttp.BasicStrategy((username, password, done) => {
        console.log("ENDPOINT USE /passport".yellow);
        console.log("TENTATIVO LOGIN DA ".green + username);
        //provo a cercare una persona con le credenziali ricevute
        user.getModelloUser().findOne({ username: username }, (errore, user) => {
            //se ce qualche errore generico
            if (errore) {
                console.log(("FINE ENDPOINT USE /passport " + errore).red);
                return done({ statusCode: 501, endpoint: "/passport", method: "use", error: true, message: "Errore generico", reasons: errore });
            }
            //se non si trova nessun utente con quell username
            else if (!user) {
                console.log("FINE ENDPOINT USE /passport utente inesistente".red);
                return done({ statusCode: 501, endpoint: "/passport", method: "use", error: true, message: "Utente inesistente", reasons: null });
            }
            //se l utente esiste e se e valida anche la combinazione con la password
            else if (user.checkPassword(password)) {
                console.log("LOGIN EFFETTUATO".green);
                console.log("FINE ENDPOINT USE /passport".blue);
                return done(null, user);
            }
            //se l utente esiste ma la password e errata
            else {
                console.log("FINE ENDPOINT USE /passport password errata".red);
                return done({ statusCode: 501, endpoint: "/passport", method: "use", error: true, message: "Password errata", reasons: null });
            }
        });
    }));
};
//# sourceMappingURL=routesLogin.js.map