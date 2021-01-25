import { Inserzione } from "src/app/classi/inserzione";
import { Libro } from "src/app/classi/Libro";

//funzione per inizializzare inserzione e libro in quanto ne devo inserire una nuova e devo azzerare i campi
export function inizializzaNuovaInserzione(): void {
    this.inserzione = new Inserzione();
    this.libro = new Libro();
}

//funzione per inserire una nuova inserzione
export function inserisciInserzione(): void {
    //inserisco il prezzo attuale
    this.inserzione.setPrezzoAttuale(this.inserzione.getPrezzoIniziale());
    //inserisco il libro
    this.ls.inserisciLibro(this.libro).subscribe((data) => {
        //estraggo tutti i libri per vedere  a che indice sono arrivato per poterlo assegnare all inserzione
        this.ls.getUltimoLibroInserito().subscribe((data) => {
            //mi converto la risposta in json in un array per sfruttare .length
            let libro = data.libri[data.libri.length - 1].idLibro;
            //inserisco l id dell utente loggato nell inserzione da inserire
            this.inserzione.setUtente(this.utenteLoggato.getIdUser());
            //imposto l id del libro sull inserzione
            this.inserzione.setLibro(libro);
            //imposto l id dell utente attuale che corrisponde all inizio all id dell utente loggato
            this.inserzione.setUtentePrezzoAttuale(this.utenteLoggato.getIdUser());
            //imposto l id del vincitore che corrisponde all inizio all id dell utente loggato
            this.inserzione.setVincitore(this.utenteLoggato.getIdUser());
            //inserisco l inserzione
            this.is.inserisciInserzione(this.inserzione).subscribe((data) => {
                //recupero tutti i dati
                this.recuperaDatiAggiornati();
                //torno nella home dello studente
                this.router.navigate(["/homepagestudente"]);
            }, (err) => {
                //errore inserimento inserzione
                this.dettagliErrore.setMessage("Errore inserimento inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore inserimento inserzione " + JSON.stringify(err));
            });
        }, (err) => {
            //errore estrazione ultimo libro inserito
            this.dettagliErrore.setMessage("Errore estrazione ultimo libro inserito");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore estrazione ultimo libro inserito " + JSON.stringify(err));
        });
    }, (err) => {
        //errore inserimento libro
        this.dettagliErrore.setMessage("Errore inserimento libro");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore inserimento libro " + JSON.stringify(err));
    });
}

//funzione per eliminare un inserzione
export function eliminaInserzione(): void {
    //elimino il libro collegato all'inserzione
    this.ls.eliminaLibro([this.inserzione.getLibro()]).subscribe(() => {
        //elimino l inserzione
        this.is.eliminaInserzione([this.inserzione.getIdInserzione()]).subscribe((data) => {
            //aggiorno i dati
            this.recuperaDatiAggiornati();
        }, (err) => {
            //errore eliminazione inserzione
            this.dettagliErrore.setMessage("Errore eliminazione inserzione");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore eliminazione inserzione " + JSON.stringify(err));
        });
    }, (err) => {
        //errore eliminazione libro
        this.dettagliErrore.setMessage("Errore eliminazione libro");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore eliminazione libro " + JSON.stringify(err));
    });
}