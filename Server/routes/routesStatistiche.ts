//import delle classi usate
import * as user from "./../classi/User";
import * as inserzione from "./../classi/Inserzione";

module.exports = function (app, auth) {

    //endpoint per la gestione delle statistiche
    app.get("/statistiche", auth, (req, res, next) => {
        console.log("ENDPOINT GET /statistiche".yellow);
        //se l utente attuale ha i permessi di studente
        if (user.newUser(req.user).hasStudente()) {
            //estraggo l utente attuale per accedere ai suoi campi
            user.getModelloUser().findOne({ idUser: req.user.idUser }).then((user) => {
                //verifico di aver trovato un utente corrispondente
                if (user) {
                    //mi estraggo la lista degli indici delle aste a cui l utente abbia fatto almeno un offerta
                    var indiciAstePartecipate = user.astePartecipate;
                    //cerco le aste a cui ha partecipato l utente
                    inserzione.getModelloInserzione().find({ idInserzione: { $in: indiciAstePartecipate } }).then((astePartecipate) => {
                        //creo la lista di inserzioni che l utente ha vinto 
                        var inserzioniVinte = new Array();
                        //verifico quali inserzioni tra quelle partecipate l utente loggato ha vinto
                        astePartecipate.forEach((inserzione) => {
                            //se e stata vinta e dall utente selezionato allora lo aggiungo alla lista da restituire
                            if (inserzione.checkVittoria() && inserzione.utentePrezzoAttuale === req.user.idUser) {
                                //la aggiungo alla lista da restituire
                                inserzioniVinte.push(inserzione);
                            }
                            //altrimenti la scarto
                        });
                        //cerco le inserzioni create da questo utente
                        inserzione.getModelloInserzione().find({ utente: req.user.idUser }).then((inserzioniCreate) => {
                            //restituisco tutti i dati
                            console.log("FINE ENDPOINT GET /statistiche".blue);
                            return res.status(200).json({ statusCode: 200, endpoint: "/statistiche", method: "get", error: false, message: "Estrazione effettuata", reasons: null, astePartecipate: astePartecipate, asteVinte: inserzioniVinte, inserzioniCreate: inserzioniCreate });
                        }).catch((errore) => {
                            //errore estrazione inserzioni create
                            console.log(("ENDPOINT GET /statistiche " + errore).red);
                            return res.status(501).json({ statusCode: 501, endpoint: "/statistiche", method: "get", error: true, message: "Errore estrazione inserzioni create", reasons: errore });
                        });
                    }).catch((errore) => {
                        //errore estrazioni che ha partecipato l utente
                        console.log(("ENDPOINT GET /statistiche " + errore).red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/statistiche", method: "get", error: true, message: "Errore estrazioni inserzioni partecipate", reasons: errore });
                    });
                }
                //se non trovo nessun utente corrispondente
                else {
                    console.log("ENDPOINT GET /statistiche".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/statistiche", method: "get", error: true, message: "Nessun utente corrispondente", reasons: null });
                }
            }).catch((errore) => {
                //errore estrazione utente loggato
                console.log(("ENDPOINT GET /statistiche " + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/statistiche", method: "get", error: true, message: "Errore estrazione utente loggato", reasons: errore });
            });
        }
        //se l utente attuale ha i permessi di moderatore
        else if (user.newUser(req.user).hasModeratore()) {
            //estraggo tutte le inserzioni per restituire quelle attive, quelle scadute vinte e quelle senza il raggiungimento del prezzo di riserva
            inserzione.getModelloInserzione().find({}).then((inserzioni) => {
                //lista per le inserzioni attive
                var inserzioniAttive = new Array();
                //lista per le inserzioni con raggiungimento del prezzo di riserva
                var inserzioniRaggiungimentoRiserva = new Array();
                //lista per le inserzioni senza raggiungimento del prezzo di riserva
                var inserzioniNonRaggiungimentoRiserva = new Array();
                //estraggo le inserzioni attive
                inserzioni.forEach((inserzione) => {
                    //se l offerta si e conclusa e vinta con superamento della soglia di riserva
                    if (inserzione.checkVittoria()) {
                        //la inserisco nella lista delle inserzioni andate a buon fine
                        inserzioniRaggiungimentoRiserva.push(inserzione);
                    }
                    //se l offerta e ancora attiva
                    else if (!inserzione.checkTempo()) {
                        //la inserisco nella lista delle inserzioni ancora attive
                        inserzioniAttive.push(inserzione);
                    }
                    //altrimenti se l offerta non e andata a buon fine ed e scaduta vuol dire senza il raggiungimento della soglia o senza nessuna offerta
                    else {
                        //la inserisco nella lista delle inserzioni non andate a buon fine
                        inserzioniNonRaggiungimentoRiserva.push(inserzione);
                    }
                });
                //quando ho finito di analizzare tutte le inserzioni presenti, le restituisco lato client suddivise per tipologia
                console.log("FINE ENDPOINT GET /statistiche ".blue);
                return res.status(200).json({ statusCode: 200, endpoint: "/statistiche", method: "get", error: false, message: "Estrazione effettuata", reasons: null, inserzioniAttive: inserzioniAttive, inserzioniNonRaggiungimentoRiserva: inserzioniNonRaggiungimentoRiserva, inserzioniRaggiungimentoRiserva: inserzioniRaggiungimentoRiserva });
            }).catch((errore) => {
                //errore estrazioni inserzioni
                console.log(("FINE ENDPOINT GET /statistiche " + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/statistiche", method: "get", error: true, message: "Errore estrazioni inserzioni", reasons: errore });
            });
        }
        //errore tipologia utente
        else {
            console.log("FINE ENDPOINT GET /statistiche non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/statistiche", method: "get", error: true, message: "Non autorizzato", reasons: null });
        }
    });

}