//import delle classi usate
import * as user from "./../classi/User";
import * as libro from "./../classi/Libro";

module.exports = function (app, auth) {

    //endpoint per estrazioni di tutti i libri
    app.get("/libri", (req, res, next) => {
        //variabile per filtri
        var filtroIdLibro = typeof (req.query.idLibro) !== "undefined" ? { "idLibro": Number(req.query.idLibro) } : {};
        var filtroNomeLibro = typeof (req.query.libro) !== "undefined" ? { "nome": new RegExp(req.query.libro.toString()) } : {};
        var filtropCorsoDiStudiLibro = typeof (req.query.corsoDiStudi) !== "undefined" ? { "corsoDiStudi": new RegExp(req.query.corsoDiStudi.toString()) } : {};
        var filtroUniversitaLibro = typeof (req.query.universita) !== "undefined" ? { "universita": new RegExp(req.query.universita.toString()) } : {};
        var filtroAutoreLibro = typeof (req.query.autore) !== "undefined" ? { "autore": new RegExp(req.query.autore.toString()) } : {};
        var filtroAnnoPubblicazioneLibro = typeof (req.query.annoPubblicazione) !== "undefined" ? { "annoPubblicazione": Number(req.query.annoPubblicazione) } : {};
        var filtroEdizioneLibro = typeof (req.query.edizione) !== "undefined" ? { "edizione": Number(req.query.edizione) } : {};
        var filtroIsbnLibro = typeof (req.query.isbn) !== "undefined" ? { "isbn": new RegExp(req.query.isbn.toString()) } : {};
        //estraggo tutti i libri
        libro.getModelloLibro().find({ $and: [filtroIdLibro, filtroNomeLibro, filtropCorsoDiStudiLibro, filtroUniversitaLibro, filtroAutoreLibro, filtroAnnoPubblicazioneLibro, filtroEdizioneLibro, filtroIsbnLibro] }).then((libri) => {
            console.log("ENDPOINT GET /libri".yellow);
            console.log("FINE ENDPOINT GET /libri".blue);
            return res.status(200).json({ statusCode: 200, endpoint: "/libri", method: "get", error: false, message: "Libri estratti", reasons: null, libri: libri });
        }).catch((errore) => {
            //errore nell estrazioni di tutti i libri
            console.log(("FINE ENDPOINT GET /libri " + errore).red);
            return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "get", error: true, message: "Errore estrazioni libri", reasons: errore });
        });
    });

    //endpoint per aggiungere un nuovo libro
    app.put("/libri", auth, (req, res, next) => {
        console.log("ENDPOINT PUT /libri".yellow);
        //vedere se  l attuale utente ha i privilegi di studente
        if (user.newUser(req.user).hasStudente()) {
            //se non ce il nome errore
            if (!req.body.nome) {
                console.log("FINE ENDPOINT PUT /libri nome mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Nome mancante", reasons: null });
            }
            //se non ce il corso di studi errore
            else if (!req.body.corsoDiStudi) {
                console.log("FINE ENDPOINT PUT /libri corso di studi mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Corso di studi mancante", reasons: null });
            }
            //se non ce l universita errore
            else if (!req.body.universita) {
                console.log("FINE ENDPOINT PUT /libri universita mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Universita mancante", reasons: null });
            }
            //se non ce l autore errore
            else if (!req.body.autore) {
                console.log("FINE ENDPOINT PUT /libri autore mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Autore mancante", reasons: null });
            }
            //se non ce anno di pubblicazione errore
            else if (!req.body.annoPubblicazione) {
                console.log("FINE ENDPOINT PUT /libri anno pubblicazione mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Anno pubblicazione mancante", reasons: null });
            }
            //se non ce l edizione errore
            else if (!req.body.edizione) {
                console.log("FINE ENDPOINT PUT /libri edizione mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Edizione mancante", reasons: null });
            }
            //se non ce l isbn errore
            else if (!req.body.isbn) {
                console.log("FINE ENDPOINT PUT /libri isbn mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Isbn mancante", reasons: null });
            }
            //verifico l'anno di pubblicazione
            if (Number(req.body.annoPubblicazione) > 1970 && Number(req.body.annoPubblicazione) < 2030) {
                //verifico che l edizione sia valida
                if (Number(req.body.edizione > 0)) {
                    //creo il libro con i dati ricevuti
                    libro.getModelloLibro().create(req.body).then((libro) => {
                        console.log("FINE ENDPOINT PUT /libri".blue);
                        return res.status(200).json({ statusCode: 200, endpoint: "/libri", method: "put", error: false, message: "Libro inserito", reasons: null, libro: libro });
                    }).catch((errore) => {
                        //errore creazione libro
                        console.log(("FINE ENDPOINT PUT /libri" + errore).red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Non inserito", reasons: errore });
                    });
                }
                //se l edizione non e valida
                else {
                    console.log("FINE ENDPOINT PUT /libri edizione non valida".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Edizione non valida", reasons: null });
                }
            }
            //errore perche l anno di pubblicazione non e valido
            else {
                console.log("FINE ENDPOINT PUT /libri anno pubblicazione non valido".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Anno pubblicazione non valido", reasons: null });
            }

        }
        //se l utente non ha i privilegi giusti per creare un libro errore
        else {
            console.log("FINE ENDPOINT PUT /libri non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Non autorizzato", reasons: null });
        }
    });

    //endpoint per modificare un libro da parte di un moderatore
    app.patch("/libri", auth, (req, res, next) => {
        console.log("ENDPOINT PATCH /libri".yellow);
        //vedere se  l attuale utente ha i privilegi di moderatore
        if (user.newUser(req.user).hasModeratore()) {
            //se non ce l id libro errore
            if (!req.body.idLibro) {
                console.log("FINE ENDPOINT PATCH /libri id libro mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Id libro mancante", reasons: null });
            }
            //se non ce il nome errore
            if (!req.body.nome) {
                console.log("FINE ENDPOINT PATCH /libri nome mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Nome mancante", reasons: null });
            }
            //se non ce il corso di studi errore
            else if (!req.body.corsoDiStudi) {
                console.log("FINE ENDPOINT PATCH /libri corso di studi mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Corso di studi mancante", reasons: null });
            }
            //se non ce l universita errore
            else if (!req.body.universita) {
                console.log("FINE ENDPOINT PATCH /libri universita mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Universita mancante", reasons: null });
            }
            //se non ce l autore errore
            else if (!req.body.autore) {
                console.log("FINE ENDPOINT PATCH /libri autore mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Autore mancante", reasons: null });
            }
            //se non ce anno di pubblicazione errore
            else if (!req.body.annoPubblicazione) {
                console.log("FINE ENDPOINT PATCH /libri anno pubblicazione mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Anno pubblicazione mancante", reasons: null });
            }
            //se non ce l edizione errore
            else if (!req.body.edizione) {
                console.log("FINE ENDPOINT PATCH /libri edizione mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Edizione mancante", reasons: null });
            }
            //se non ce l isbn errore
            else if (!req.body.isbn) {
                console.log("FINE ENDPOINT PATCH /libri isbn mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Isbn mancante", reasons: null });
            }
            //verifico l'anno di pubblicazione
            if (Number(req.body.annoPubblicazione) > 1970 && Number(req.body.annoPubblicazione) < 2030) {
                //verifico che l edizione sia valida
                if (Number(req.body.edizione > 0)) {
                    //verifico che sia valido anche il libro
                    libro.getModelloLibro().updateOne({ "idLibro": req.body.idLibro }, { $set: { "nome": req.body.nome, "corsoDiStudi": req.body.corsoDiStudi, "universita": req.body.universita, "autore": req.body.autore, "annoPubblicazione": req.body.annoPubblicazione, "edizione": req.body.edizione, "isbn": req.body.isbn } }).then(() => {
                        console.log("FINE ENDPOINT PATCH /libri".blue);
                        return res.status(200).json({ statusCode: 200, endpoint: "/libri", method: "patch", error: false, message: "Libro modificata", reasons: null });
                    }).catch((errore) => {
                        //errore aggiornamento libro
                        console.log(("FINE ENDPOINT PATCH /libri " + errore).red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Errore modificare libro", reasons: errore });
                    });
                }
                //se l edizione non e valida
                else {
                    console.log("FINE ENDPOINT PATCH /libri edizione non valida".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Edizione non valida", reasons: null });
                }
            }
            //errore perche l anno di pubblicazione non e valido
            else {
                console.log("FINE ENDPOINT PATCH /libri anno pubblicazione non valido".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "put", error: true, message: "Anno pubblicazione non valido", reasons: null });
            }
        }
        //se invece l utente non e un moderatore errore
        else {
            console.log("FINE ENDPOINT PATCH /libri non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "patch", error: true, message: "Non autorizzato", reasons: null });
        }
    });

    //endpoint per eliminare dei libri da parte di un moderatore
    app.delete("/libri", auth, (req, res, next) => {
        console.log("ENDPOINT DELETE /libri".yellow);
        //vedere che sia presente l id del libro da eliminare altrimenti errore
        if (!req.query.idLibro) {
            console.log("FINE ENDPOINT DELETE /libri id libro mancante".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "delete", error: true, message: "Id libro mancante", reasons: null });
        }
        //vedere se  l attuale utente ha i privilegi di moderatore
        if (user.newUser(req.user).hasModeratore()) {
            //creo il filtro per eliminare piu libri nello stesso momento sfruttando un array di indici
            var listaLibri = new Array();
            var filtroIdLibro = {};
            //creo il filtro per i libri che ho ricevuto come parametro
            if (typeof (req.query.idLibro) !== "undefined") {
                req.query.idLibro.toString().split(',').forEach((element) => {
                    listaLibri.push(Number(element));
                });
                filtroIdLibro = { idLibro: { $in: listaLibri } };
            }
            //verifico che esistano i libri
            libro.getModelloLibro().find(filtroIdLibro).then((l) => {
                //se quelli trovati sono validi
                if (l) {
                    //elimino i libri dal database
                    libro.getModelloLibro().deleteMany(filtroIdLibro).then(() => {
                        console.log("FINE ENDPOINT DELETE /libri".blue);
                        return res.status(200).json({ statusCode: 200, endpoint: "/libri", method: "delete", error: false, message: "Libri eliminati", reasons: null });
                    }).catch((errore) => {
                        //errore eliminazione libro
                        console.log(("FINE ENDPOINT DELETE /libri " + errore).red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "delete", error: true, message: "Errore eliminazione libri", reasons: errore });
                    });
                }
                //se non trovo nessun libro
                else {
                    console.log("FINE ENDPOINT DELETE /libri nessun libro con quel id".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "delete", error: true, message: "Nessun libro con quel id", reasons: null });
                }
            }).catch((errore) => {
                console.log(("FINE ENDPOINT DELETE /libri errore estrazione libri" + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "delete", error: true, message: "Nessun libro con quel id", reasons: errore });
            });
        }
        //se invece l utente loggato è uno studente
        else if (user.newUser(req.user).hasStudente()) {
            //verifico che esistano i libri
            libro.getModelloLibro().find(filtroIdLibro).then((l) => {
                //se quelli trovati sono validi
                if (l) {
                    //elimino i libri dal database
                    libro.getModelloLibro().deleteOne({ idLibro: req.query.idLibro }).then(() => {
                        console.log("FINE ENDPOINT DELETE /libri".blue);
                        return res.status(200).json({ statusCode: 200, endpoint: "/libri", method: "delete", error: false, message: "Libri eliminati", reasons: null });
                    }).catch((errore) => {
                        //errore eliminazione libro
                        console.log(("FINE ENDPOINT DELETE /libri " + errore).red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "delete", error: true, message: "Errore eliminazione libri", reasons: errore });
                    });
                }
                //se non trovo nessun libro
                else {
                    console.log("FINE ENDPOINT DELETE /libri nessun libro con quel id".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "delete", error: true, message: "Nessun libro con quel id", reasons: null });
                }
            }).catch((errore) => {
                console.log(("FINE ENDPOINT DELETE /libri errore estrazione libri" + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "delete", error: true, message: "Nessun libro con quel id", reasons: errore });
            });
        }
        //non connesso come studente e non connesso come moderatore
        else {
            console.log("FINE ENDPOINT DELETE /libri non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/libri", method: "delete", error: true, message: "Non autorizzato", reasons: null });
        }
    });

}