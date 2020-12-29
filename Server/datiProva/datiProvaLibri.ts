//import delle classi usate
import * as libro from "./../classi/Libro";

module.exports = function () {

    //eliminazione dati di prova sui libri gia presenti
    libro.getModelloLibro().deleteMany({}).then(() => {
        console.log("INIZIO INSERIMENTO DATI PROVA LIBRI".yellow);
        //creo i libri da inserire nel database
        var l1 = libro.getModelloLibro().create({
            idLibro: 1,
            nome: "nome1",
            corsoDiStudi: "corso1",
            universita: "universita1",
            autore: "autore1",
            annoPubblicazione: 2015,
            edizione: 1,
            isbn: "isbn1"
        });
        var l2 = libro.getModelloLibro().create({
            idLibro: 2,
            nome: "nome2",
            corsoDiStudi: "corso2",
            universita: "universita2",
            autore: "autore2",
            annoPubblicazione: 2017,
            edizione: 2,
            isbn: "isbn2"
        });
        var l3 = libro.getModelloLibro().create({
            idLibro: 3,
            nome: "nome3",
            corsoDiStudi: "corso3",
            universita: "universita3",
            autore: "autore3",
            annoPubblicazione: 2019,
            edizione: 3,
            isbn: "isbn3"
        });
        var l4 = libro.getModelloLibro().create({
            idLibro: 4,
            nome: "nome4",
            corsoDiStudi: "corso4",
            universita: "universita4",
            autore: "autore4",
            annoPubblicazione: 2019,
            edizione: 4,
            isbn: "isbn4"
        });
        //inserisco i libri nel database
        Promise.all([l1, l2, l3, l4]).then(() => {
            console.log("FINE INSERIMENTO DATI PROVA LIBRI".blue);
        }).catch((reason) => {
            console.log(("ERRORE INSERIMENTO DATI PROVA LIBRI" + reason).red);
        });
    }).catch((errore) => {
        console.log(("ERRORE ELIMINAZIONE DATI PROVA LIBRI" + errore).red);
    });

}