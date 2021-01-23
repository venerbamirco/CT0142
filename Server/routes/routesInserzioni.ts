//import delle classi usate
import * as user from "./../classi/User";
import * as inserzione from "./../classi/Inserzione";
import * as libro from "./../classi/Libro";

module.exports = function (app, auth) {

    //endpoint per aggiungere una nuova inserzione
    app.put("/inserzioni", auth, (req, res, next) => {
        console.log("ENDPOINT PUT /inserzioni".yellow);
        //vedere se  l attuale utente ha i privilegi di studente
        if (user.newUser(req.user).hasStudente()) {
            //se non ce l utente errore
            if (!req.body.utente) {
                console.log("FINE ENDPOINT PUT /inserzioni utente mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Utente mancante", reasons: null });
            }
            //se non ce il libro errore
            else if (!req.body.libro) {
                console.log("FINE ENDPOINT PUT /inserzioni libro mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Libro mancante", reasons: null });
            }
            //se non ce la data di inizio errore
            else if (!req.body.dataInizio) {
                console.log("FINE ENDPOINT PUT /inserzioni data inizio mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Data inizio mancante", reasons: null });
            }
            //se non ce la data di fine
            else if (!req.body.dataFine) {
                console.log("FINE ENDPOINT PUT /inserzioni data fine mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Data fine mancante", reasons: null });
            }
            //se non ce il prezzo iniziale errore
            else if (!req.body.prezzoIniziale) {
                console.log("FINE ENDPOINT PUT /inserzioni prezzo iniziale mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Prezzo iniziale mancante", reasons: null });
            }
            //se non ce il prezzo di riserva errore
            else if (!req.body.prezzoRiserva) {
                console.log("FINE ENDPOINT PUT /inserzioni prezzo riserva mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Prezzo riserva mancante", reasons: null });
            }
            //se non ce il prezzo attuale errore
            else if (!req.body.prezzoAttuale) {
                console.log("FINE ENDPOINT PUT /inserzioni prezzo attuale mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Prezzo attuale mancante", reasons: null });
            }
            //se non ce l utente prezzo attuale errore
            else if (!req.body.utentePrezzoAttuale) {
                console.log("FINE ENDPOINT PUT /inserzioni utente prezzo attuale mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Utente prezzo attuale mancante", reasons: null });
            }
            //se non ce il vincitore errore
            else if (!req.body.vincitore) {
                console.log("FINE ENDPOINT PUT /inserzioni vincitore mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Vincitore mancante", reasons: null });
            }
            //verifico che il prezzo attuale siaminore di quello di riserva
            if (Number(req.body.prezzoIniziale) < Number(req.body.prezzoRiserva)) {
                //verifico che la data di fine sia maggiore di quella di inizio e quella di fine maggiore di quella attuale
                if (new Date(req.body.dataFine) > new Date(req.body.dataInizio) && new Date(req.body.dataFine) > new Date()) {
                    //verifico che ci sia un utente con quell id
                    user.getModelloUser().findOne({ idUser: req.body.utente }).then((utente) => {
                        //se l utente trovato non e valido errore
                        if (!utente) {
                            console.log("FINE ENDPOINT PUT /inserzioni utente inesistente".red);
                            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Utente inesistente", reasons: null });
                        }
                        //se l utente trovato e valido
                        else {
                            //verifico che sia valido anche il libro
                            libro.getModelloLibro().findOne({ idLibro: req.body.libro }).then((libro) => {
                                //se il libro trovato non e valido
                                if (!libro) {
                                    console.log("FINE ENDPOINT PUT /inserzioni libro inesistente".red);
                                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Libro inesistente", reasons: null });
                                }
                                //se anche il libro trovato e valido
                                else {
                                    //creo l inserzione con i dati ricevuti
                                    inserzione.getModelloInserzione().create(req.body).then((inserzione) => {
                                        console.log("FINE ENDPOINT PUT /inserzioni".blue);
                                        return res.status(200).json({ statusCode: 200, endpoint: "/inserzioni", method: "put", error: false, message: "Inserzione inserita", reasons: null, inserzione: inserzione });
                                    }).catch((errore) => {
                                        return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Non inserita", reasons: errore });
                                    });
                                }
                            }).catch((errore) => {
                                //errore di ricerca per trovare il ilbro con quell id
                                console.log(("FINE ENDPOINT PUT /inserzioni " + errore).red);
                                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Errore ricerca libro nel database", reasons: errore });
                            });
                        }
                    }).catch((errore) => {
                        //errore di ricerca per trovare l utente con quell id
                        console.log(("FINE ENDPOINT PUT /inserzioni " + errore).red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Errore ricerca utente nel database", reasons: errore });
                    });
                }
                //errore perche la data di fine è minore di quella di inizio
                else {
                    console.log("FINE ENDPOINT PUT /inserzioni data di fine è minore di quella di inizio".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Data di fine è minore di quella di inizio", reasons: null });
                }
            }
            //errore perche il prezzo di riserva è minore di quello iniziale
            else {
                console.log("FINE ENDPOINT PUT /inserzioni prezzo di riserva è minore di quello iniziale".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Prezzo di riserva è minore di quello iniziale", reasons: null });
            }
        }
        //se l utente non e uno studente non puo aggiungere inserzioni
        else {
            console.log("FINE ENDPOINT PUT /inserzioni non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "put", error: true, message: "Non autorizzato", reasons: null });
        }
    });

    //endpoint per modificare un inserzione da parte di un moderatore
    app.patch("/inserzioni", auth, (req, res, next) => {
        console.log("ENDPOINT PATCH /inserzioni".yellow);
        //vedere se  l attuale utente ha i privilegi di moderatore
        if (user.newUser(req.user).hasModeratore()) {
            //se non ce l id dell inserzione da modificare errore
            if (!req.body.idInserzione) {
                console.log("FINE ENDPOINT PATCH /inserzioni idInserzione mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Id inserzione mancante", reasons: null });
            }
            //se non ce l utente dell inserzione da modificare errore
            if (!req.body.utente) {
                console.log("FINE ENDPOINT PATCH /inserzioni utente mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Utente mancante", reasons: null });
            }
            //se non ce il libro dell inserzione da modificare errore
            else if (!req.body.libro) {
                console.log("FINE ENDPOINT PATCH /inserzioni libro mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Libro mancante", reasons: null });
            }
            //se non ce la data di inizio dell inserzione da modificare errore
            else if (!req.body.dataInizio) {
                console.log("FINE ENDPOINT PATCH /inserzioni data inizio mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Data inizio mancante", reasons: null });
            }
            //se non ce la data di fine dell inserzione da modificare errore
            else if (!req.body.dataFine) {
                console.log("FINE ENDPOINT PATCH /inserzioni data fine mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Data fine mancante", reasons: null });
            }
            //se non ce il prezzo iniziale dell inserzione da modificare errore
            else if (!req.body.prezzoIniziale) {
                console.log("FINE ENDPOINT PATCH /inserzioni prezzo iniziale mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Prezzo iniziale mancante", reasons: null });
            }
            //se non ce il prezzo di riserva dell inserzione da modificare errore
            else if (!req.body.prezzoRiserva) {
                console.log("FINE ENDPOINT PATCH /inserzioni prezzo riserva mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Prezzo riserva mancante", reasons: null });
            }
            //se non ce l utente dell ultima offerta dell inserzione da modificare errore
            else if (!req.body.utentePrezzoAttuale) {
                console.log("FINE ENDPOINT PATCH /inserzioni utente prezzo attuale mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Utente prezzo attuale mancante", reasons: null });
            }
            //se non ce il prezzo attuale dell inserzione da modificare errore
            else if (!req.body.prezzoAttuale) {
                console.log("FINE ENDPOINT PATCH /inserzioni prezzo attuale mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Prezzo attuale mancante", reasons: null });
            }
            //verifico che il prezzo attuale siaminore di quello di riserva
            if (Number(req.body.prezzoIniziale) < Number(req.body.prezzoRiserva)) {
                //verifico che la data di fine sia maggiore di quella di inizio e quella di fine maggiore di quella attuale
                if (new Date(req.body.dataFine) > new Date(req.body.dataInizio) && new Date(req.body.dataFine) > new Date()) {
                    //verifico che ci sia un utente con quell id
                    user.getModelloUser().findOne({ idUser: req.body.utente }).then((u) => {
                        //se l utente trovato e valido ed è uno studente
                        if (u && u.hasStudente()) {
                            //verifico che sia valido anche il libro
                            libro.getModelloLibro().findOne({ idLibro: req.body.libro }).then((l) => {
                                //se il libro trovato non e valido
                                if (!l) {
                                    console.log("FINE ENDPOINT PATCH /inserzioni libro inesistente".red);
                                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Libro inesistente", reasons: null });
                                }
                                //se anche il libro trovato e valido
                                else {
                                    //verifico che sia valido anche l inserzione
                                    inserzione.getModelloInserzione().findOne({ idInserzione: req.body.idInserzione }).then((i) => {
                                        //se l inserzione trovata non e valida
                                        if (!i) {
                                            console.log("FINE ENDPOINT PATCH /inserzioni inserzione inesistente".red);
                                            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Inserzione inesistente", reasons: null });
                                        }
                                        //se anche l inserzione trovata e valida
                                        else {
                                            //verifico che sia valido anche l utente che ha fatto la proposta di offerta
                                            user.getModelloUser().findOne({ idUser: req.body.utentePrezzoAttuale }).then((u) => {
                                                //se anche questo utente e valido ed è uno studente allora posso modificare l inserzione
                                                if (u && u.hasStudente()) {
                                                    //modifico l inserzione 
                                                    inserzione.getModelloInserzione().updateOne({ "idInserzione": req.body.idInserzione }, { $set: { "utente": req.body.utente, "libro": req.body.libro, "dataInizio": new Date(req.body.dataInizio.toString()), "dataFine": new Date(req.body.dataFine.toString()), "prezzoIniziale": req.body.prezzoIniziale, "prezzoRiserva": req.body.prezzoRiserva, "utentePrezzoAttuale": req.body.utentePrezzoAttuale, "prezzoAttuale": req.body.prezzoAttuale } }).then(() => {
                                                        console.log("FINE ENDPOINT PATCH /inserzioni".blue);
                                                        return res.status(200).json({ statusCode: 200, endpoint: "/inserzioni", method: "patch", error: false, message: "Inserzione modificata", reasons: null });
                                                    }).catch((errore) => {
                                                        //errore aggiornamento inserzione
                                                        console.log(("FINE ENDPOINT PATCH /inserzioni " + errore).red);
                                                        return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Errore modificare inserzione", reasons: errore });
                                                    });
                                                }
                                                //se l utente trovato non e valido
                                                else {
                                                    console.log("FINE ENDPOINT PATCH /inserzioni utente offerta inesistente".red);
                                                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Utente offerta inesistente", reasons: null });
                                                }
                                            }).catch((errore) => {
                                                //errore di ricerca per trovare l utente offerta con quell id
                                                console.log(("FINE ENDPOINT PATCH /inserzioni " + errore).red);
                                                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Errore ricerca utente offerta nel database", reasons: errore });
                                            });
                                        }
                                    }).catch((errore) => {
                                        //errore di ricerca per trovare l inserzione con quell id
                                        console.log(("FINE ENDPOINT PATCH /inserzioni " + errore).red);
                                        return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Errore ricerca inserzione nel database", reasons: errore });
                                    });
                                }
                            }).catch((errore) => {
                                //errore di ricerca per trovare il ilbro con quell id
                                console.log(("FINE ENDPOINT PATCH /inserzioni " + errore).red);
                                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Errore ricerca libro nel database", reasons: errore });
                            });
                        }
                        //se l utente trovato non e valido errore
                        else {
                            console.log("FINE ENDPOINT PATCH /inserzioni utente inesistente".red);
                            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Utente inesistente", reasons: null });
                        }
                    }).catch((errore) => {
                        //errore di ricerca per trovare l utente con quell id
                        console.log(("FINE ENDPOINT PATCH /inserzioni " + errore).red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Errore ricerca utente nel database", reasons: errore });
                    });
                }
                //errore perche la data di fine è minore di quella di inizio
                else {
                    console.log("FINE ENDPOINT PATCH /inserzioni data di fine è minore di quella di inizio".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Data di fine è minore di quella di inizio", reasons: null });
                }
            }
            //errore perche il prezzo di riserva è minore di quello iniziale
            else {
                console.log("FINE ENDPOINT PATCH /inserzioni prezzo di riserva è minore di quello iniziale".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Prezzo di riserva è minore di quello iniziale", reasons: null });
            }
        }
        //se invece l utente non e un moderatore errore
        else {
            console.log("FINE ENDPOINT PATCH /inserzioni non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "patch", error: true, message: "Non autorizzato", reasons: null });
        }
    });

    //endpoint per fare una nuova offerta ad una inserzione
    app.post("/inserzioni", auth, (req, res, next) => {
        console.log("ENDPOINT POST /inserzioni".yellow);
        //vedere se  l attuale utente ha i privilegi di studente
        if (user.newUser(req.user).hasStudente()) {
            //se non ce l id dell inserzione da fare una nuova offerta errore
            if (!req.body.idInserzione) {
                console.log("FINE ENDPOINT POST /inserzioni idInserzione mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Id inserzione mancante", reasons: null });
            }
            //se non ce l utente della nuova offerta
            if (!req.body.idUser) {
                console.log("FINE ENDPOINT POST /inserzioni utente mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Utente mancante", reasons: null });
            }
            //se non ce la nuova offerta valida errore
            if (!req.body.nuovaOfferta) {
                console.log("FINE ENDPOINT POST /inserzioni offerta mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Offerta mancante", reasons: null });
            }
            //estraggo i dati dell inserzione e verifico che sia un inserzione valida
            inserzione.getModelloInserzione().findOne({ idInserzione: req.body.idInserzione }).then((inserzioni) => {
                //verifico che l inserzione sia valida
                if (inserzioni) {
                    //verifico che l inserzione non sia gia scaduta
                    if (!inserzioni.checkTempo()) {
                        //verifico che l offerta nuova sia maggiore di quella precedente
                        if (req.body.nuovaOfferta > inserzioni.prezzoAttuale) {
                            //verifico che l utente dell offerta sia valido
                            user.getModelloUser().findOne({ idUser: req.body.idUser }).then((user) => {
                                //verifico di aver trovato un utente valido
                                if (user) {
                                    //posso aggiornare con la nuova offerta
                                    inserzione.getModelloInserzione().updateOne({ "idInserzione": req.body.idInserzione }, { $set: { "utentePrezzoAttuale": req.body.idUser, "prezzoAttuale": req.body.nuovaOfferta } }).then(() => {
                                        //ho trovato l utente e adesso aggiungo l asta partecipata
                                        user.setAstaPartecipate(req.body.idInserzione);
                                        //salvo i cambiamenti
                                        user.save().then(() => {
                                            console.log("FINE ENDPOINT POST /inserzioni".blue);
                                            return res.status(200).json({ statusCode: 200, endpoint: "/inserzioni", method: "post", error: false, message: "Offerta inviata", reasons: null });
                                        }).catch((errore) => {
                                            //errore salvataggio cambiamenti
                                            console.log(("FINE ENDPOINT POST /inserzioni " + errore).red);
                                            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Errore salvataggio offerta partecipata", reasons: errore });
                                        });
                                    }).catch((errore) => {
                                        //errore aggiornamento inserzione
                                        console.log(("FINE ENDPOINT POST /inserzioni " + errore).red);
                                        return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Errore modifica inserzione", reasons: errore });
                                    });
                                }
                                //se l utente non e valido errore
                                else {
                                    console.log("FINE ENDPOINT POST /inserzioni utente non valido".red);
                                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Utente non valido", reasons: null });
                                }
                            }).catch((errore) => {
                                //errore estrazione utente
                                console.log(("FINE ENDPOINT POST /inserzioni " + errore).red);
                                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Errore salvataggio offerta", reasons: errore });
                            });
                        }
                        //se l offerta attuale è minore di quella ultima errore
                        else {
                            console.log("FINE ENDPOINT POST /inserzioni offerta troppo bassa rispetto all attuale".red);
                            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Offerta troppo bassa rispetto all attuale", reasons: null });
                        }
                    }
                    //l inserzione e giaa scaduta e quindi errore
                    else {
                        console.log("FINE ENDPOINT POST /inserzioni inserzione gia scaduta".red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Inserzione gia scaduta", reasons: null });
                    }
                }
                //se non trovo nessuna coincidenza
                else {
                    console.log("FINE ENDPOINT POST /inserzioni nessuna inserzione corrispondente".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Nessuna inserzione corrispondente", reasons: null });
                }
            }).catch((errore) => {
                console.log(("FINE ENDPOINT POST /inserzioni " + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Errore estrazion singola inserzione", reasons: errore });
            });
        }
        //se l utente loggato non e studente errore
        else {
            console.log("FINE ENDPOINT POST /inserzioni non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "post", error: true, message: "Non autorizzato", reasons: null });
        }
    });

    //endpoint per estrarre tutte le inserzioni di vendite con possibilita di filtraggio. per filtrare quelle attive si farà lato client con la verifica della data di fine inserzione perche cosi e piu generica
    app.get("/inserzioni", (req, res, next) => {
        console.log("ENDPOINT GET /inserzioni".yellow);
        //creo il filtro per lista di id in input
        var listaAsteIdInput = new Array();
        var filtroIdInserzione = {};
        //creo il filtro per le aste partecipate che ho ricevuto come parametro
        if (typeof (req.query.idInserzione) !== "undefined") {
            req.query.idInserzione.toString().split(',').forEach((element) => {
                listaAsteIdInput.push(Number(element));
            });
            filtroIdInserzione = { idInserzione: { $in: listaAsteIdInput } };

        }
        //per prima cosa ottengo tutti gli indici dei libri filtrati per nome, corso di studi, universita
        libro.getModelloLibro().find({ "nome": new RegExp(typeof (req.query.nomeLibro) !== "undefined" ? req.query.nomeLibro.toString() : ""), "corsoDiStudi": new RegExp(typeof (req.query.corsoDiStudi) !== "undefined" ? req.query.corsoDiStudi.toString() : ""), "universita": new RegExp(typeof (req.query.universita) !== "undefined" ? req.query.universita.toString() : "") }).then((libri) => {
            //creo l array degli indici dei libri che poi andro a filtrare
            var indiciLibri: number[] = new Array();
            //per ciasun libro trovato
            libri.forEach((libro) => {
                //inserisco l indice del libro da cercare nel filtro finale
                indiciLibri.push(libro.idLibro);
            });
            //quando ho finito di scorrere tutti i libri che avevo trovato, posso iniziare a filtrare la zona geografica del venditore e che sia uno studente
            user.getModelloUser().find({ ruolo: { $in: ["Studente"] }, "areaGeografica": new RegExp(typeof (req.query.areaGeografica) !== "undefined" ? req.query.areaGeografica.toString() : ""), "username": new RegExp(typeof (req.query.username) !== "undefined" ? req.query.username.toString() : "") }).then((utenti) => {
                //creo l array per l indice degli utenti che poi andro a filtrare
                var indiciUtenti: number[] = new Array();
                //per ciascun utente trovato aggiungo l id nell array
                utenti.forEach((utente) => {
                    indiciUtenti.push(utente.idUser);
                });
                //quando ho finito di filtrare anche tutti gli utenti posso filtrare le inserzioni basandomi anche sui 2 array di indici trovati
                inserzione.getModelloInserzione().find({ $and: [filtroIdInserzione, { libro: { $in: indiciLibri }, "utente": { $in: indiciUtenti }, "prezzoAttuale": { $gte: (typeof (req.query.prezzoAttualeMinimo) !== "undefined" ? Number(req.query.prezzoAttualeMinimo.toString()) : 0), $lte: (typeof (req.query.prezzoAttualeMassimo) !== "undefined" ? Number(req.query.prezzoAttualeMassimo.toString()) : 9999) } }] }).then((inserzioni) => {
                    //restituisco la lista delle inserzioni e per vedere se risulto vincitore basta confrontare l utente dell ultim offerta con l id di quello loggato e se la data di oggi è maggiore di quella di fine inserzione
                    console.log("FINE ENDPOINT GET /inserzioni ".blue);
                    return res.status(200).json({ statusCode: 200, endpoint: "/inserzioni", method: "get", error: false, message: "Estrazione inserzioni effettuata", reasons: null, inserzioni: inserzioni });
                }).catch((errore) => {
                    //errore estrazioni inserzioni con filtraggio
                    console.log(("FINE ENDPOINT GET /inserzioni " + errore).red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "get", error: true, message: "Errore estrazioni inserzioni", reasons: errore });
                });
            }).catch((errore) => {
                //errore estrazioni utenti con filtraggio
                console.log(("FINE ENDPOINT GET /inserzioni " + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "get", error: true, message: "Errore estrazioni utenti", reasons: errore });
            });
        }).catch((errore) => {
            //errore estrazione libri con filtraggio
            console.log(("ENDPOINT GET /inserzioni " + errore).red);
            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "get", error: true, message: "Errore estrazioni libri", reasons: errore });
        });
    });

    //endpoint per eliminare un inserzione da parte di un moderatore
    app.delete("/inserzioni", auth, (req, res, next) => {
        console.log("ENDPOINT DELETE /inserzioni".yellow);
        //vedere se  l attuale utente ha i privilegi di moderatore
        if (user.newUser(req.user).hasModeratore()) {
            //vedere che sia presente l id dell inserzione da modificare altrimenti errore
            if (!req.query.idInserzione) {
                console.log("FINE ENDPOINT DELETE /inserzioni idInserzione mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Id inserzione mancante", reasons: null });
            }
            //creo il filtro per eliminare piu inserzioni nello stesso momento sfruttando un array di indici
            var listaInserzioni = new Array();
            var filtroIdInserzione = {};
            //creo il filtro per le aste partecipate che ho ricevuto come parametro
            if (typeof (req.query.idInserzione) !== "undefined") {
                req.query.idInserzione.toString().split(',').forEach((element) => {
                    listaInserzioni.push(Number(element));
                });
                filtroIdInserzione = { idInserzione: { $in: listaInserzioni } };
            }
            //estraggo le inserzioni dall id
            inserzione.getModelloInserzione().find(filtroIdInserzione).then((i) => {
                //elimino l inserzione dal database
                inserzione.getModelloInserzione().deleteMany(filtroIdInserzione).then(() => {
                    console.log("FINE ENDPOINT DELETE /inserzioni".blue);
                    return res.status(200).json({ statusCode: 200, endpoint: "/inserzioni", method: "delete", error: false, message: "Inserzioni eliminata", reasons: null });
                }).catch((errore) => {
                    //errore eliminazione inserzione
                    console.log(("FINE ENDPOINT DELETE /inserzioni " + errore).red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Errore eliminazione inserzione", reasons: errore });
                });
            }).catch((errore) => {
                //errore estrarre inserzione dall id
                console.log("FINE ENDPOINT DELETE /inserzioni errore cercare inserzione con l id".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Errore cercare l inserzione con l id", reasons: errore });
            });
        }
        //se invece l utente loggato è uno studente
        else if (user.newUser(req.user).hasStudente()) {
            //estraggo l inserzione dall id
            inserzione.getModelloInserzione().findOne({ idInserzione: Number(req.query.idInserzione) }).then((i) => {
                //se l inserzione è valida
                if (i) {
                    //verifico che effettivamente l'utente loggato ha creato questa inserzione
                    if (user.newUser(req.user).idUser === i.utente) {
                        //verifico che l inserzione sia scaduta
                        if (inserzione.newInserzione(i).checkTempo()) {
                            //elimino l inserzione dal database
                            inserzione.getModelloInserzione().deleteOne({ idInserzione: req.query.idInserzione }).then(() => {
                                console.log("FINE ENDPOINT DELETE /inserzioni".blue);
                                return res.status(200).json({ statusCode: 200, endpoint: "/inserzioni", method: "delete", error: false, message: "Inserzioni eliminata", reasons: null });
                            }).catch((errore) => {
                                //errore eliminazione inserzione
                                console.log(("FINE ENDPOINT DELETE /inserzioni " + errore).red);
                                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Errore eliminazione inserzione lato studente", reasons: errore });
                            });
                        }
                        //se non scaduta non la posso eliminare
                        else {
                            console.log("FINE ENDPOINT DELETE /inserzioni lato studente non si puo eliminare inserzioni ancora attive".red);
                            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Lato studente non si puo eliminare inserzioni ancora attive", reasons: null });
                        }
                    }
                    //errore perche non posso eliminare inserzioni create da altri studenti
                    else {
                        console.log("FINE ENDPOINT DELETE /inserzioni lato studente non possibile eliminare inserzioni create da altri studenti".red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Lato studente non possibile eliminare inserzioni create da altri studenti", reasons: null });
                    }
                }
                //altrimenti se non valida
                else {
                    console.log("FINE ENDPOINT DELETE /inserzioni errore estrazione inserzione dall id".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Errore estrazione inserzioni dall id", reasons: null });
                }
            }).catch((errore) => {
                //errore estrarre inserzione dall id
                console.log(("FINE ENDPOINT DELETE /inserzioni Errore cercare inserzione con l id" + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Errore cercare l inserzione con l id", reasons: errore });
            });
        }
        //non connesso come studente e non connesso come moderatore
        else {
            console.log("FINE ENDPOINT DELETE /inserzioni non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/inserzioni", method: "delete", error: true, message: "Non autorizzato", reasons: null });
        }
    });

}