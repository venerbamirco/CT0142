import { Utente } from "src/app/classi/user";

//funzione per estrarre la lista di utenti
export function getListaStudenti(): void {
    //estraggo la lista di studenti
    this.us.getListaStudenti().subscribe((data) => {
        //per ciascun studente trovato
        for (var i = 0; i < data.utenti.length; ++i) {
            //lo inserisco nella lista di studenti 
            this.utenti.push(new Utente(data.utenti[i]));
        }
    }, (err) => {
        //errore estrazione lista studenti
        this.dettagliErrore.setMessage("Errore estrazione lista studenti");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione lista studenti " + JSON.stringify(err));
    });
}

//funzione per eliminare uno studente
export function eliminaStudente(idStudente: number): void {
    //mi creo la lista di indici delle inserzioni da eliminare
    var listaIndiciInserzioni: number[] = new Array();
    //mi creo la lista di indici dei libri collegati alle inserzioni da eliminare
    var listaIndiciLibriInserzioni: number[] = new Array();
    //estraggo tutte le inserzioni
    this.is.getListaInserzioni().subscribe((data) => {
        //per ciascuna inserzione estratta
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //controllo che l utente che voglio eliminare non abbia ultime offerte nelle inserzioni altrimenti errore
            if (data.inserzioni[i].utentePrezzoAttuale === idStudente) {
                //controllo che creatore dell inserzione e dell ultima offerta non coindano 
                if (data.inserzioni[i].utentePrezzoAttuale !== data.inserzioni[i].utente) {
                    //errore eliminazione studente perche ha delle ultime offerte
                    this.dettagliErrore.setMessage("Errore eliminazione studente perche ha ultime offerte nelle inserzioni");
                    this.dettagliErrore.setReason("");
                    console.log("Errore eliminazione studente perche ha ultime offerte nelle inserzioni");
                    return;
                }
            }
        }
        //per ciascuna inserzioni
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //controllo che l inserzione sia stata creata dallo studente da eliminare
            if (data.inserzioni[i].utente === idStudente) {
                //inserisco l indice dell inserzione nella lista di id
                listaIndiciInserzioni.push(data.inserzioni[i].idInserzione);
                //inserisco l id del libro nella lista degli indici da eliminare
                listaIndiciLibriInserzioni.push(data.inserzioni[i].libro);
            }
        }
        //controllo se ha delle inserzioni 
        if (listaIndiciInserzioni.length !== 0) {
            //elimino le inserzioni
            this.is.eliminaInserzione(listaIndiciInserzioni).subscribe((data) => {
                //elimino i libri
                this.ls.eliminaLibro(listaIndiciLibriInserzioni).subscribe((data) => {
                    //elimino lo studente
                    this.us.eliminaStudente(idStudente).subscribe((data) => {
                        //aggiorno i dati
                        this.aggiornaDati();
                    }, (err) => {
                        //errore eliminazione studente
                        this.dettagliErrore.setMessage("Errore eliminazione studente");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore eliminazione studente " + JSON.stringify(err));
                    });
                }, (err) => {
                    //errore eliminazione libro
                    this.dettagliErrore.setMessage("Errore eliminazione libri");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore eliminazione libri " + JSON.stringify(err));
                });
            }, (err) => {
                //errore eliminazione inserzione
                this.dettagliErrore.setMessage("Errore eliminazione inserzioni");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore eliminazione inserzioni " + JSON.stringify(err));
            });
        }
        //se invece l utente non ha inserzioni
        else {
            //elimino lo studente
            this.us.eliminaStudente(idStudente).subscribe((data) => {
                //aggiorno i dati
                this.aggiornaDati();
            }, (err) => {
                //errore eliminazione studente
                this.dettagliErrore.setMessage("Errore eliminazione studente");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore eliminazione studente " + JSON.stringify(err));
            });
        }
    });
}