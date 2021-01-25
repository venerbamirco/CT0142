"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import delle classi usate
const user = require("./../classi/User");
module.exports = function (app, auth) {
    //endpoint per resettare la password dello studente e mettergli una password temporanea
    app.post("/studenti", (req, res, next) => {
        console.log("ENDPOINT POST /studenti".yellow);
        //verifico di avere l id dell utente da resettare la password
        if (!req.body.email) {
            console.log("FINE ENDPOINT POST /studenti email mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "post", error: true, message: "email mancante", reasons: null });
        }
        //controllo di aver ricevuto l id giusto dello studente da cambiare la password temporanea e controllo che sia uno studente
        user.getModelloUser().findOne({ email: req.body.email, ruolo: { $in: ["Studente"] } }).then((user) => {
            //verifico che l utente sia valido
            if (user) {
                //cambio la password
                user.setPassword("Temporanea2020");
                //memorizzo il cambiamento anche nel database
                user.save().then(() => {
                    console.log("FINE ENDPOINT POST /studenti password resettata".blue);
                    return res.status(200).json({ statusCode: 200, endpoint: "/studenti", method: "post", error: false, message: "Password resettata", reasons: null });
                }).catch((errore) => {
                    console.log(("FINE ENDPOINT POST /studenti " + errore).red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "post", error: true, message: "Errore salvataggio cambiamenti", reasons: errore });
                });
            }
            //se non ho trovato nessuna coincidenza
            else {
                console.log("FINE ENDPOINT POST /studenti nessun utente corrispondente".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "post", error: true, message: "Nessun utente corrispondente", reasons: null });
            }
        }).catch((errore) => {
            //errore estrazione utente singolo per modificare la password 
            console.log("FINE ENDPOINT POST /studenti errore cambiare password".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "post", error: true, message: "Password gia cambiata", reasons: null });
        });
    });
    //endpoint per modificare la password dello studente e modificarla se e solo se corrisponde alla password temporanea e solo l utente stesso se loggato puo modificare la propria password
    app.patch("/studenti", auth, (req, res, next) => {
        console.log("ENDPOINT PATCH /studenti".yellow);
        //verifico che l utente loggato sia uno studente altrimenti non puo cambiare la password
        if (user.newUser(req.user).hasStudente()) {
            //verifico di avere la password nuova da impostare altrimenti errore
            console.log(req.body);
            if (!req.body.password) {
                console.log("FINE ENDPOINT PATCH /studenti password mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "patch", error: true, message: "Password mancante", reasons: null });
            }
            //verifico di avere la conferma password nuova da impostare altrimenti errore
            if (!req.body.confermaPassword) {
                console.log("FINE ENDPOINT PATCH /studenti conferma password mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "patch", error: true, message: "Conferma password mancante", reasons: null });
            }
            //verifico che coincidano altrimenti errore
            if (req.body.password !== req.body.confermaPassword) {
                console.log("FINE ENDPOINT PATCH /studenti le due password non coincidono".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "patch", error: true, message: "Le password non coincidono", reasons: null });
            }
            //controllo di aver ricevuto l id dello studente da cambiare la password temporanea
            user.getModelloUser().findOne({ idUser: req.user.idUser }).then((user) => {
                //verifico che l utente sia valido
                if (user) {
                    //verifico che l utente selezionato abbia la password temporanea
                    if (user.checkPassword("Temporanea2020")) {
                        //cambio la password
                        user.setPassword(req.body.password);
                        //memorizzo il cambiamento anche nel database
                        user.save().then(() => {
                            console.log("FINE ENDPOINT PATCH /studenti password modificata".blue);
                            return res.status(200).json({ statusCode: 200, endpoint: "/studenti", method: "patch", error: false, message: "Password cambiata", reasons: null });
                        }).catch((errore) => {
                            console.log(("FINE ENDPOINT PATCH /studenti " + errore).red);
                            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "patch", error: true, message: "Errore salvataggio cambiamenti", reasons: errore });
                        });
                    }
                    //non posso cambiare password perche non ha la temporanea
                    else {
                        console.log("FINE ENDPOINT PATCH /studenti password gia cambiata".red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "patch", error: true, message: "Password gia cambiata", reasons: null });
                    }
                }
                //se non ho trovato nessuna coincidenza
                else {
                    console.log("FINE ENDPOINT PATCH /studenti nessun utente corrispondente".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "patch", error: true, message: "nessun utente corrispondente", reasons: null });
                }
            }).catch((errore) => {
                //errore estrazione utente singolo per modificare la password 
                console.log("FINE ENDPOINT PATCH /studenti errore cambiare password".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "patch", error: true, message: "Password gia cambiata", reasons: null });
            });
        }
        //se non e un moderatore
        else {
            console.log("FINE ENDPOINT PATCH /studenti non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "patch", error: true, message: "Non autorizzato", reasons: null });
        }
    });
    //endpoint per la registrazione degli studenti
    app.put("/studenti", (req, res, next) => {
        console.log("ENDPOINT PUT /studenti".yellow);
        //il controllo per la verifica dello username e email univoci mappati nella classe user tramite unique
        //creo l utente con i dati passati nel body
        var u = user.newUser(req.body);
        //se non ce la password errore
        if (!req.body.password) {
            console.log("FINE ENDPOINT PUT /studenti password mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Password mancante", reasons: null });
        }
        //se non ce la conferma password errore
        if (!req.body.confermaPassword) {
            console.log("FINE ENDPOINT PUT /studenti conferma password mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Conferma assword mancante", reasons: null });
        }
        //se non ce il nome errore
        if (!req.body.nome) {
            console.log("FINE ENDPOINT PUT /studenti nome mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Nome mancante", reasons: null });
        }
        //se non ce il cognome errore
        if (!req.body.cognome) {
            console.log("FINE ENDPOINT PUT /studenti cognome mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Cognome mancante", reasons: null });
        }
        //se non ce lo username errore
        if (!req.body.username) {
            console.log("FINE ENDPOINT PUT /studenti username mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Username mancante", reasons: null });
        }
        //se non ce l email errore
        if (!req.body.email) {
            console.log("FINE ENDPOINT PUT /studenti email mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Email mancante", reasons: null });
        }
        //se non ce l area geografica errore
        if (!req.body.areaGeografica) {
            console.log("FINE ENDPOINT PUT /studenti area geografica mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Area geografica mancante", reasons: null });
        }
        //se non ce la lista di aste partecipate errore. alla registrazione dovrebbe corrispondere ad array vuoto
        if (!req.body.astePartecipate) {
            console.log("FINE ENDPOINT PUT /studenti aste partecipate mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Aste partecipate mancante", reasons: null });
        }
        //se password e conferma password coincidono vado avanti
        if (req.body.password === req.body.confermaPassword) {
            u.setPassword(req.body.password);
            u.setStudente();
            //salvo l utente nel database
            u.save().then(() => {
                console.log("FINE ENDPOINT PUT /studenti".blue);
                return res.status(200).json({ statusCode: 200, endpoint: "/studenti", method: "put", error: false, message: "Utente registrato", reasons: null });
            }).catch((errore) => {
                //se invece non e possibile registrare l utente
                console.log(("FINE ENDPOINT PUT /studenti " + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Errore registrazione", reasons: errore });
            });
        }
        //se le password non coincidono
        else {
            console.log("FINE ENDPOINT PUT /studenti password non coincidono".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "put", error: true, message: "Password non coincidono", reasons: null });
        }
    });
    //endpoint per eliminare determinati studenti da parte di un moderatore
    app.delete("/studenti", auth, (req, res, next) => {
        console.log("ENDPOINT DELETE /studenti".yellow);
        //verifico di aver ricevuto l id dello studente da eliminare
        if (!req.query.idUtente) {
            console.log("FINE ENDPOINT DELETE /studenti idUtente mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "delete", error: true, message: "IdUtente mancante", reasons: null });
        }
        //vedere se  l attuale utente ha i privilegi di moderatore altrimenti errore
        if (!user.newUser(req.user).hasModeratore()) {
            console.log("FINE ENDPOINT DELETE /studenti non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "delete", error: true, message: "Non autorizzato", reasons: null });
        }
        //verifico che sia valido anche l utente
        user.getModelloUser().findOne({ idUser: Number(req.query.idUtente) }).then((u) => {
            //se anche questo utente e valido allora posso modificare l inserzione
            if (u && u.hasStudente()) {
                //cerco di eliminare gli studenti con un determinato id
                user.getModelloUser().deleteOne({ ruolo: { $in: ["Studente"] }, idUser: Number(req.query.idUtente) }).then(() => {
                    console.log("FINE ENDPOINT DELETE /studenti".blue);
                    return res.status(200).json({ statusCode: 200, endpoint: "/studenti", method: "delete", error: false, message: "Studente eliminato", reasons: null });
                    //se non riesco ad eliminare
                }).catch((errore) => {
                    console.log(("FINE ENDPOINT DELETE /studenti " + errore).red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "delete", error: true, message: "Errore eliminazione studente", reasons: errore });
                });
            }
            //se l utente trovato non e valido
            else {
                console.log("FINE ENDPOINT DELETE /inserzioni utente inesistente".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Utente inesistente", reasons: null });
            }
        }).catch((errore) => {
            //errore di ricerca per trovare l utente offerta con quell id
            console.log(("FINE ENDPOINT DELETE /inserzioni " + errore).red);
            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Errore ricerca utente nel database", reasons: errore });
        });
    });
    //endpoint per ottenere la lista di tutti gli studenti
    app.get("/studenti", (req, res, next) => {
        console.log("ENDPOINT GET /studenti".yellow);
        //variabile per filtri
        var fltroIdUser = typeof (req.query.idUser) !== "undefined" ? { "idUser": Number(req.query.idUser.toString()) } : {};
        var filtroNome = typeof (req.query.nome) !== "undefined" ? { "nome": new RegExp(req.query.nome.toString()) } : {};
        var filtroCognome = typeof (req.query.cognome) !== "undefined" ? { "cognome": new RegExp(req.query.cognome.toString()) } : {};
        var filtroUsername = typeof (req.query.username) !== "undefined" ? { "username": new RegExp(req.query.username.toString()) } : {};
        var filtroEmail = typeof (req.query.email) !== "undefined" ? { "email": new RegExp(req.query.email.toString()) } : {};
        var filtroAreaGeografica = typeof (req.query.areaGeografica) !== "undefined" ? { "areaGeografica": new RegExp(req.query.areaGeografica.toString()) } : {};
        var listaAstePartecipateInput = new Array();
        var filtroAstePartecipate = {};
        //creo il filtro per le aste partecipate che ho ricevuto come parametro
        if (typeof (req.query.astePartecipate) !== "undefined") {
            req.query.astePartecipate.toString().split(',').forEach((element) => {
                listaAstePartecipateInput.push(Number(element));
            });
            filtroAstePartecipate = { astePartecipate: { $in: listaAstePartecipateInput } };
        }
        //se riesco a estrarre tutti gli utenti li restituisco
        user.getModelloUser().find({
            ruolo: { $in: ["Studente"] }, $and: [filtroAstePartecipate, fltroIdUser, filtroNome, filtroCognome, filtroUsername, filtroEmail, filtroAreaGeografica]
        }).then((studenti) => {
            console.log("FINE ENDPOINT GET /studenti".blue);
            return res.status(200).json({ statusCode: 200, endpoint: "/studenti", method: "get", error: false, message: "Studenti estratti", reasons: null, utenti: studenti });
        }).catch((errore) => {
            //se non si riesce ad estrarre tutti gli utenti
            console.log(("FINE ENDPOINT GET /studenti " + errore).red);
            return res.status(501).json({ statusCode: 501, endpoint: "/studenti", method: "get", error: true, message: "Errore estrazione studenti", reasons: errore });
        });
    });
};
//# sourceMappingURL=routesStudenti.js.map