"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import delle classi usate
const inserzione = require("./../classi/Inserzione");
module.exports = function () {
    //eliminazione dati di prova sulle inserzioni gia presenti
    inserzione.getModelloInserzione().deleteMany({}).then(() => {
        console.log("INIZIO INSERIMENTO DATI PROVA INSERZIONI".yellow);
        //creo le inserzioni di prova da inserire nel database
        var i1 = inserzione.getModelloInserzione().create({
            idInserzione: 1,
            utente: 1,
            libro: 1,
            dataInizio: "2020-05-13",
            dataFine: "2020-12-25",
            prezzoIniziale: 1,
            prezzoAttuale: 33,
            utentePrezzoAttuale: 3,
            prezzoRiserva: 25,
            vincitore: 3
        });
        var i2 = inserzione.getModelloInserzione().create({
            idInserzione: 2,
            utente: 3,
            libro: 2,
            dataInizio: "2020-02-25",
            dataFine: "2021-11-24",
            prezzoIniziale: 1,
            prezzoAttuale: 68,
            utentePrezzoAttuale: 4,
            prezzoRiserva: 39,
            vincitore: 0
        });
        var i3 = inserzione.getModelloInserzione().create({
            idInserzione: 3,
            utente: 3,
            libro: 3,
            dataInizio: "2019-05-27",
            dataFine: "2020-10-27",
            prezzoIniziale: 10,
            prezzoAttuale: 24,
            utentePrezzoAttuale: 1,
            prezzoRiserva: 54,
            vincitore: 0
        });
        var i4 = inserzione.getModelloInserzione().create({
            idInserzione: 4,
            utente: 4,
            libro: 4,
            dataInizio: "2019-05-27",
            dataFine: "2021-12-25",
            prezzoIniziale: 10,
            prezzoAttuale: 105,
            utentePrezzoAttuale: 3,
            prezzoRiserva: 54,
            vincitore: 0
        });
        //inserisco le inserzioni di prova nel database
        Promise.all([i1, i2, i3, i4]).then(() => {
            console.log("FINE INSERIMENTO DATI PROVA INSERZIONI".blue);
            //se ce qualche errore in fase di inserimento nel database
        }).catch((reason) => {
            console.log(("ERRORE INSERIMENTO DATI PROVA INSERZIONI" + reason).red);
        });
        //se ce qualche errore in fase di eliminazione dei dati gia presenti nel database
    }).catch((errore) => {
        console.log(("ERRORE ELIMINAZIONE DATI PROVA INSERZIONI" + errore).red);
    });
};
//# sourceMappingURL=datiProvaInserzioni.js.map