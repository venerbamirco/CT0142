//import delle classi usate
import * as messaggio from "./../classi/Messaggio";

module.exports = function () {

    //eliminazione dati dei messaggi
    messaggio.getModelloMessaggio().deleteMany({}).then(() => {
        console.log("INIZIO INSERIMENTO DATI PROVA MESSAGGI".yellow);
        //creo i messaggi da inserire nel database
        var m1 = messaggio.getModelloMessaggio().create({
            idMessaggio: 1,
            idInserzione: 2,
            messaggioRiferimento: 0,
            oggetto: "oggetto1",
            contenuto: "contenuto1",
            data: new Date(),
            mittente: 1,
            destinatario: 3
        });
        var m2 = messaggio.getModelloMessaggio().create({
            idMessaggio: 2,
            idInserzione: 1,
            messaggioRiferimento: 1,
            oggetto: "oggetto2",
            contenuto: "contenuto2",
            data: new Date(),
            mittente: 3,
            destinatario: 1
        });
        //creo i messaggi da inserire nel database
        var m3 = messaggio.getModelloMessaggio().create({
            idMessaggio: 3,
            idInserzione: 2,
            messaggioRiferimento: 2,
            oggetto: "oggetto1",
            contenuto: "contenuto1",
            data: new Date(),
            mittente: 1,
            destinatario: 3
        });
        //inserisco i messaggi nel database
        Promise.all([m1, m2, m3]).then(() => {
            console.log("FINE INSERIMENTO DATI PROVA MESSAGGI".blue);
            //se ce qualche errore in fase di inserimento nel database
        }).catch((reason) => {
            console.log(("ERRORE INSERIMENTO DATI PROVA MESSAGGI " + reason).red);
        });
        //se ce qualche errore in fase di eliminazione dei record presenti nel database
    }).catch((errore) => {
        console.log(("ERRORE ELIMINAZIONE DATI PROVA MESSAGGI" + errore).red);
    });

}