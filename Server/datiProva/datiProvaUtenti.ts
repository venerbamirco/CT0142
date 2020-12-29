//import delle classi usate
import * as user from "./../classi/User";

module.exports = function () {

    //eliminazione dati sugli utenti gia presenti
    user.getModelloUser().deleteMany({}).then(() => {
        console.log("INIZIO INSERIMENTO DATI PROVA USER".yellow);
        //creo gli utenti da inserire nel database creandoli di tutte le tipologie possibili
        var u1 = user.newUser({
            idUser: 1,
            ruolo: ["Studente"],
            nome: "nome1",
            cognome: "cognome1",
            username: "username1",
            email: "utente1@email.it",
            areaGeografica: "area1",
            astePartecipate: [2, 3],
            salt: "",
            digest: ""
        });
        u1.setPassword("password1");
        var u2 = user.newUser({
            idUser: 2,
            ruolo: ["Moderatore"],
            nome: "nome2",
            cognome: "cognome2",
            username: "username2",
            email: "utente2@email.it",
            areaGeografica: "area2",
            astePartecipate: [],
            salt: "",
            digest: ""
        });
        u2.setPassword("password2");
        var u3 = user.newUser({
            idUser: 3,
            ruolo: ["Studente"],
            nome: "nome3",
            cognome: "cognome3",
            username: "username3",
            email: "utente3@email.it",
            areaGeografica: "area3",
            astePartecipate: [1, 4],
            salt: "",
            digest: ""
        });
        u3.setPassword("password3");
        var u4 = user.newUser({
            idUser: 4,
            ruolo: ["Studente"],
            nome: "nome4",
            cognome: "cognome4",
            username: "username4",
            email: "utente4@email.it",
            areaGeografica: "area4",
            astePartecipate: [2],
            salt: "",
            digest: ""
        });
        u4.setPassword("password4");
        //inserisco gli utenti nel database
        u1.save();
        u2.save();
        u3.save();
        u4.save();
        console.log("FINE INSERIMENTO DATI PROVA USER".blue);
        //errore eliminazione record gia presenti nel database
    }).catch((errore) => {
        console.log(("ERRORE ELIMINAZIONE DATI PROVA USER" + errore).red);
    });

}