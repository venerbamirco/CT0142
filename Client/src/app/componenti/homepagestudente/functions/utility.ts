import { Libro } from "src/app/classi/Libro";
import { Messaggio } from "src/app/classi/messaggio";

//funzione per ottenre il messaggio dall id
export function getMessaggioById(idMessaggio: number): Messaggio {
    //scorro i messaggi in quanto il messaggio di riferimento fa parte della stessa tipologia di messaggi che avevo estratto precedentemente
    for (let i = 0; i < this.listaMessaggi.length; ++i) {
        //se l id di riferimento corrisponde
        if (idMessaggio === this.listaMessaggi[i].getIdMessaggio()) {
            return this.listaMessaggi[i];
        }
    }
    //se invece non ce 
    return null;
}

//funzione per ottenere la lista dei libri associati alle varie inserzioni
export function getLibriAssociatiInserzioni(): void {
    //per ciascuna inserzione creata
    for (let i = 0; i < this.inserzioniCreate.length; ++i) {
        //ottengo il libro a lui riferito
        this.ls.getLibroById(this.inserzioniCreate[i].getLibro()).subscribe((data) => {
            this.libriCreati.push(new Libro(data.libri[0]));
        }, (err) => {
            //errore estrazione libro dell inserzione 
            this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
        });
    }
}

//funzione per vedere se una data e gia scaduta
export function isScaduta(): boolean {
    return this.inserzione.isScaduta();
}

//funzione per vedere se la lista di utenti è vuota
export function isVuota(lista: any[]): boolean {
    //se la lunghezza è maggiore di zero falso
    if (lista.length > 0) {
        return false;
    }
    //altrimenti vero
    return true;
}