"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import delle classi usate
const user = require("./../classi/User");
module.exports = function (app, auth) {
    //endpoint per modificare la password del moderatore e modificarla se e solo se corrisponde alla password temporanea e solo l utente stesso se loggato puo modificare la propria password
    app.patch("/moderatori", auth, (req, res, next) => {
        console.log("ENDPOINT PATCH /moderatori".yellow);
        //verifico che l utente loggato sia un moderatore altrimenti non puo cambiare la password
        if (user.newUser(req.user).hasModeratore()) {
            //verifico di avere la password nuova da impostare altrimenti errore
            if (!req.body.password) {
                console.log("FINE ENDPOINT PATCH /moderatori password mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "patch", error: true, message: "Password mancante", reasons: null });
            }
            //verifico di avere la conferma della password nuova da impostare altrimenti errore
            if (!req.body.confermaPassword) {
                console.log("FINE ENDPOINT PATCH /moderatori conferma password mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "patch", error: true, message: "Conferma password mancante", reasons: null });
            }
            //controllo che le due password coincidano
            if (req.body.password === req.body.confermaPassword) {
                //controllo di aver ricevuto l id del moderatore da cambiare la password temporanea
                user.getModelloUser().findOne({ idUser: req.user.idUser }).then((u) => {
                    //verifico che l utente sia valido
                    if (u) {
                        //verifico che l utente selezionato abbia la password temporanea
                        if (u.checkPassword("Temporanea2020")) {
                            //cambio la password
                            u.setPassword(req.body.password);
                            //memorizzo il cambiamento anche nel database
                            u.save().then(() => {
                                console.log("FINE ENDPOINT PATCH /moderatori password modificata".blue);
                                return res.status(200).json({ statusCode: 200, endpoint: "/moderatori", method: "patch", error: false, message: "Password cambiata", reasons: null });
                            }).catch((errore) => {
                                console.log(("FINE ENDPOINT PATCH /moderatori " + errore).red);
                                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "patch", error: true, message: "Errore salvataggio cambiamenti", reasons: errore });
                            });
                        }
                        //non posso cambiare password perche non ha la temporanea
                        else {
                            console.log("FINE ENDPOINT PATCH /moderatori password gia cambiata".red);
                            return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "patch", error: true, message: "Password gia cambiata", reasons: null });
                        }
                    }
                    //se non ho trovato nessuna coincidenza
                    else {
                        console.log("FINE ENDPOINT PATCH /moderatori nessun utente corrispondente".red);
                        return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "patch", error: true, message: "nessun utente corrispondente", reasons: null });
                    }
                }).catch((errore) => {
                    //errore estrazione utente singolo per modificare la password 
                    console.log("FINE ENDPOINT PATCH /moderatori errore cambiare password".red);
                    return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "patch", error: true, message: "Password gia cambiata", reasons: errore });
                });
            }
            else {
                //errore le due password non coincidono
                console.log("FINE ENDPOINT PATCH /moderatori le due password non coincidono".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "patch", error: true, message: "Le due password non coincidono", reasons: null });
            }
        }
        //se non e un moderatore
        else {
            console.log("FINE ENDPOINT PATCH /moderatori non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "patch", error: true, message: "Non autorizzato", reasons: null });
        }
    });
    //endpoint per la registrazione dei moderatori
    app.put("/moderatori", auth, (req, res, next) => {
        console.log("ENDPOINT PUT /moderatori".yellow);
        //registrazione moderatori solo su invito e quindi bisogna verificare di essere moderatori
        console.log(user.newUser(req.user));
        if (user.newUser(req.user).hasModeratore()) {
            //creo l utente con i dati passati nel body
            var u = user.newUser(req.body);
            //non controllo che password e conferma password ci siano e corrispondano in quanto devo impostare una password temporanea da modificare al primo accesso
            //se non ce il nome errore
            if (!req.body.nome) {
                console.log("FINE ENDPOINT PUT /moderatori nome mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "put", error: true, message: "Nome mancante", reasons: null });
            }
            //se non ce il cognome errore
            if (!req.body.cognome) {
                console.log("FINE ENDPOINT PUT /moderatori cognome mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "put", error: true, message: "Cognome mancante", reasons: null });
            }
            //se non ce lo username errore
            if (!req.body.username) {
                console.log("FINE ENDPOINT PUT /moderatori username mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "put", error: true, message: "Username mancante", reasons: null });
            }
            //se non ce l email errore
            if (!req.body.email) {
                console.log("FINE ENDPOINT PUT /moderatori email mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "put", error: true, message: "Email mancante", reasons: null });
            }
            //se non ce l area geografica errore
            if (!req.body.areaGeografica) {
                console.log("FINE ENDPOINT PUT /moderatori area geografica mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "put", error: true, message: "Area geografica mancante", reasons: null });
            }
            //se non ce la lista di aste partecipate errore. alla registrazione dovrebbe corrispondere ad array vuoto in quanto non con dati se moderatore
            if (!req.body.astePartecipate) {
                console.log("FINE ENDPOINT PUT /moderatori aste partecipate mancante".red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "put", error: true, message: "Aste partecipate mancante", reasons: null });
            }
            //imposto la password temporanea
            u.setPassword("Temporanea2020");
            //imposto i diritti di moderatore
            u.setModeratore();
            //salvo l utente nel database
            u.save().then((data) => {
                console.log("FINE ENDPOINT PUT /moderatori".blue);
                return res.status(200).json({ statusCode: 200, endpoint: "/moderatori", method: "put", error: false, message: "Utente registrato", reasons: null });
            }).catch((errore) => {
                //se invece non e possibile registrare l utente
                console.log(("FINE ENDPOINT PUT /moderatori " + errore).red);
                return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "put", error: true, message: "Errore registrazione", reasons: errore });
            });
        }
        //se non si e moderatori
        else {
            console.log("FINE ENDPOINT PUT /moderatori non autorizzato".red);
            return res.status(501).json({ statusCode: 501, endpoint: "/moderatori", method: "put", error: true, message: "Non autorizzato", reasons: null });
        }
    });
};
//# sourceMappingURL=routesModeratori.js.map