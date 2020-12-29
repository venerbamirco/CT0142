//import delle classi usate
import * as user from "./../classi/User";
import * as messaggio from "./../classi/Messaggio";
import * as inserzione from "./../classi/Inserzione";

module.exports = function (app, auth, ios) {

    //endpoint per estrazioni di tutti i messaggi
    app.get("/messaggi", (req, res, next) => {
        console.log("ENDPOINT GET /messaggi".yellow);
        //variabile per filtri
        var filtroIdMessaggio = typeof (req.query.idMessaggio) !== "undefined" ? { "idMessaggio": Number(req.query.idMessaggio) } : {};
        var filtroIdInserzione = typeof (req.query.idInserzione) !== "undefined" ? { "idInserzione": Number(req.query.idInserzione) } : {};
        var filtroMessaggioRiferimento = typeof (req.query.messaggioRiferimento) !== "undefined" ? { "messaggioRiferimento": Number(req.query.messaggioRiferimento) } : {};
        var filtroOggetto = typeof (req.query.oggetto) !== "undefined" ? { "oggetto": new RegExp(req.query.oggetto.toString()) } : {};
        var filtroContenuto = typeof (req.query.contenuto) !== "undefined" ? { "contenuto": new RegExp(req.query.contenuto.toString()) } : {};
        var filtroData = typeof (req.query.data) !== "undefined" ? { "data": new Date(req.query.data.toString()) } : {};
        var filtroMittente = typeof (req.query.mittente) !== "undefined" ? { "mittente": Number(req.query.mittente) } : {};
        var filtroDestinatario = typeof (req.query.destinatario) !== "undefined" ? { "destinatario": Number(req.query.destinatario) } : {};
        //estraggo tutti i messaggi
        messaggio.getModelloMessaggio().find({ $and: [filtroIdMessaggio, filtroIdInserzione, filtroMessaggioRiferimento, filtroOggetto, filtroMittente, filtroDestinatario, filtroContenuto, filtroData] }).then((messaggi) => {
            console.log("FINE ENDPOINT GET /messaggi".yellow);
            return res.status(200).json({ statusCode: 200, endpoint: "/messaggi", method: "get", error: false, message: "Messaggi estratti", reasons: null, messaggi: messaggi });
        }).catch((errore) => {
            //errore nell estrazioni di tutti i messaggi
            console.log(("FINE ENDPOINT GET /messaggi " + errore).red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "get", error: true, message: "Errore estrazioni messaggi", reasons: errore });
        });
    });

    //endpoint per inviare un messaggio ad un inserzionista
    app.put("/messaggi", auth, (req, res, next) => {
        console.log("ENDPOINT PUT /messaggi".yellow);
        //se non ce il messaggio di riferimento errore, 0 se e il messaggio di root oppure il primo e quindi non collegato ad altri messaggi
        if (!req.body.messaggioRiferimento && req.body.messaggioRiferimento !== 0) {
            console.log("FINE ENDPOINT PUT /messaggi mittente messaggioRiferimento".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Messaggio di riferimento mancante", reasons: null });
        }
        //se non ce l inserzione di riferimento errore
        if (!req.body.idInserzione && req.body.idInserzione !== 0) {
            console.log("FINE ENDPOINT PUT /messaggi idInserzione inesistente".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Id inserzione mancante", reasons: null });
        }
        //se non ce l oggetto errore
        if (!req.body.oggetto) {
            console.log("FINE ENDPOINT PUT /messaggi oggetto inesistente".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Oggetto mancante", reasons: null });
        }
        //se non ce un contenuto errore
        if (!req.body.contenuto) {
            console.log("FINE ENDPOINT PUT /messaggi contenuto inesistente".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Contenuto mancante", reasons: null });
        }
        //se non ce un destinatario errore
        if (!req.body.destinatario && req.body.destinatario !== 0) {
            console.log("FINE ENDPOINT PUT /messaggi destinatario inesistente".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Destinatario mancante", reasons: null });
        }
        //se non ce un mittente errore
        if (!req.body.mittente) {
            console.log("FINE ENDPOINT PUT /messaggi mittente inesistente".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Mittente mancante", reasons: null });
        }
        //verifico che sia valido anche il mittente
        user.getModelloUser().findOne({ idUser: req.body.mittente }).then((u) => {
            //se l utente trovato non e valido
            if (!u) {
                console.log("FINE ENDPOINT PUT /messaggi mittente inesistente".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Mittente inesistente", reasons: null });
            }
            //se anche questo utente e valido allora posso controllare il destinatario
            else {
                //verifico che sia valido anche il destinatario
                user.getModelloUser().findOne({ idUser: req.body.destinatario }).then((u) => {
                    //se l utente trovato non e valido ma non e pubblico
                    if (!u && req.body.destinatario !== 0) {
                        console.log("FINE ENDPOINT PUT /messaggi destinatario inesistente".red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Destinatario inesistente", reasons: null });
                    }
                    //se anche questo utente e valido allora posso inserire il messaggio
                    else {
                        //verifico che sia valido anche il messaggio di riferimento
                        messaggio.getModelloMessaggio().findOne({ idMessaggio: req.body.messaggioRiferimento }).then((m) => {
                            //se e valido il messaggio trovato
                            if (m || req.body.messaggioRiferimento === 0) {
                                //verifico che anche l inserzione di riferimento sia valida
                                inserzione.getModelloInserzione().find({ idInserzione: req.body.idInserzione }).then((i) => {
                                    //se  l inserzione trovata e valida
                                    if (i || req.body.idInserzione === 0) {
                                        //posso inserire il messaggio
                                        messaggio.getModelloMessaggio().create(req.body).then((messaggio) => {
                                            //invio il messaggio in broadcast e quando lo ricevo lato client verifico il destinatario altrimenti lo scarto
                                            ios.emit("broadcast", messaggio);
                                            console.log("FINE ENDPOINT PUT /messaggi".blue);
                                            return res.status(200).json({ statusCode: 200, endpoint: "/messaggi", method: "put", error: false, message: "Messaggio inserito", reasons: null, messaggio: messaggio });
                                        }).catch((errore) => {
                                            //errore inserimento messaggio
                                            console.log(("FINE ENDPOINT PUT /messaggi " + errore).red);
                                            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Errore inserimento messaggio", reasons: errore });
                                        });
                                    }
                                    //altrimenti se non e valida
                                    else {
                                        console.log("FINE ENDPOINT PUT /messaggi inserzione inesistente".red);
                                        return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Inserzione inesistente", reasons: null });
                                    }
                                }).catch((errore) => {
                                    //errore estrazione inserzione
                                    console.log(("FINE ENDPOINT PUT /messaggi " + errore).red);
                                    return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Errore estrazione inserimento", reasons: errore });
                                });
                            }
                            //se il messaggio di riferimento non e valido
                            else {
                                console.log("FINE ENDPOINT PUT /messaggi messaggio di riferimento inesistente".red);
                                return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Messaggio riferimento inesistente", reasons: null });
                            }
                        }).catch((errore) => {
                            //errore verifica messaggio riferimento
                            console.log(("FINE ENDPOINT PUT /messaggi " + errore).red);
                            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Errore estrazione messaggio riferimento", reasons: errore });
                        });
                    }
                }).catch((errore) => {
                    //errore di ricerca per trovare l utente offerta con quell id
                    console.log(("FINE ENDPOINT PUT /messaggi " + errore).red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Errore ricerca utente nel database", reasons: errore });
                });
            }
        }).catch((errore) => {
            //errore di ricerca per trovare l utente offerta con quell id
            console.log(("FINE ENDPOINT PUT /messaggi " + errore).red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "put", error: true, message: "Errore ricerca utente nel database", reasons: errore });
        });
    });

    //endpoint per eliminare dei messaggi da parte di un moderatore
    /*NB: non verifico che l inserzione esista o che l utente esista in quanto tengo memorizzati sempre i messaggi anche
    se l utente o l inserzione vengono eliminati*/
    app.delete("/messaggi", auth, (req, res, next) => {
        console.log("ENDPOINT DELETE /messaggi".yellow);
        //vedere se  l attuale utente ha i privilegi di moderatore
        if (user.newUser(req.user).hasModeratore()) {
            //guardo se devo eliminare i messaggi per id del messaggio
            if (req.query.idMessaggio) {
                //creo il filtro per eliminare piu messaggi nello stesso momento sfruttando un array di indici
                var listaMessaggi = new Array();
                var filtroIdMessaggio = {};
                //creo il filtro per i messaggi che ho ricevuto come parametro
                if (typeof (req.query.idMessaggio) !== "undefined") {
                    req.query.idMessaggio.toString().split(',').forEach((element) => {
                        listaMessaggi.push(Number(element));
                    });
                    filtroIdMessaggio = { idMessaggio: { $in: listaMessaggi } };
                }
                //elimino i messaggi dal database
                messaggio.getModelloMessaggio().deleteMany(filtroIdMessaggio).then(() => {
                    console.log("FINE ENDPOINT DELETE /messaggi".blue);
                    return res.status(200).json({ statusCode: 200, endpoint: "/messaggi", method: "delete", error: false, message: "Messaggi eliminati", reasons: null });
                }).catch((errore) => {
                    //errore eliminazione messaggio
                    console.log(("FINE ENDPOINT DELETE /messaggi " + errore).red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "delete", error: true, message: "Errore eliminazione messaggi", reasons: errore });
                });
            }
            //guardo se devo eliminare i messaggi per id dell inserzione
            else if (req.query.idInserzione) {
                //creo il filtro per eliminare piu messaggi nello stesso momento sfruttando un array di indici
                var listaMessaggi = new Array();
                var filtroIdInserzione = {};
                //creo il filtro per i messaggi che ho ricevuto come parametro
                if (typeof (req.query.idInserzione) !== "undefined") {
                    req.query.idInserzione.toString().split(',').forEach((element) => {
                        listaMessaggi.push(Number(element));
                    });
                    filtroIdInserzione = { idInserzione: { $in: listaMessaggi } };
                }
                //elimino i messaggi dal database
                messaggio.getModelloMessaggio().deleteMany(filtroIdInserzione).then(() => {
                    console.log("FINE ENDPOINT DELETE /messaggi".blue);
                    return res.status(200).json({ statusCode: 200, endpoint: "/messaggi", method: "delete", error: false, message: "Messaggi eliminati", reasons: null });
                }).catch((errore) => {
                    //errore eliminazione messaggio
                    console.log(("FINE ENDPOINT DELETE /messaggi " + errore).red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "delete", error: true, message: "Errore eliminazione messaggi", reasons: errore });
                });
            }
            //guardo se devo eliminare i messaggi per id utente
            else if (req.query.idUtente) {
                //creo il filtro per eliminare piu messaggi nello stesso momento sfruttando un array di indici
                var listaMessaggi = new Array();
                var filtroIdUtente = {};
                //creo il filtro per i messaggi che ho ricevuto come parametro
                if (typeof (req.query.idUtente) !== "undefined") {
                    req.query.idUtente.toString().split(',').forEach((element) => {
                        listaMessaggi.push(Number(element));
                    });
                    filtroIdInserzione = { $or: [{ mittente: { $in: listaMessaggi } }, { destinatario: { $in: listaMessaggi } }] };
                }
                //elimino i messaggi dal database
                messaggio.getModelloMessaggio().deleteMany(filtroIdInserzione).then(() => {
                    console.log("FINE ENDPOINT DELETE /messaggi".blue);
                    return res.status(200).json({ statusCode: 200, endpoint: "/messaggi", method: "delete", error: false, message: "Messaggi eliminati", reasons: null });
                }).catch((errore) => {
                    //errore eliminazione messaggio
                    console.log(("FINE ENDPOINT DELETE /messaggi " + errore).red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "delete", error: true, message: "Errore eliminazione messaggi", reasons: errore });
                });
            }
            else {
                //se non ce nessun filtro errore
                console.log("FINE ENDPOINT DELETE /messaggi nessun filtro scelto".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "delete", error: false, message: "Nessun filtro scelto", reasons: null });
            }
        }
        //se invece l utente loggato non ha i permessi per fare l eliminazione errore
        else {
            console.log("FINE ENDPOINT DELETE /messaggi non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/messaggi", method: "delete", error: true, message: "Non autorizzato", reasons: null });
        }
    });

}