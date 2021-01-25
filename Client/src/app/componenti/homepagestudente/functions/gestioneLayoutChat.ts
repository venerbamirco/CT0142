import { Messaggio } from "src/app/classi/messaggio";
import { Utente } from "src/app/classi/user";

//funzione per vedere se in un determinato messaggio l utente loggato sia il mittente
export function isMittente(messaggio: Messaggio): boolean {
    //verifico che il messaggio sia valido
    if (messaggio) {
        //verifico che il mittente sia l utente loggato
        if (messaggio.getMittente() === this.utenteLoggato.getIdUser()) {
            //restituisco vero
            return true;
        }
    }
    //altrimenti errore e restituisco falso
    return false;
}

//funzione per vedere se in un determinato messaggio l utente loggato sia il destinatario
export function isDestinatario(messaggio: Messaggio): boolean {
    //verifico che il messaggio sia valido
    if (messaggio) {
        //verifico che il destinatario sia l utente loggato
        if ((messaggio.getDestinatario() === this.utenteLoggato.getIdUser()) || (messaggio.getDestinatario() === 0 && messaggio.getMittente() !== this.utenteLoggato.getIdUser())) {
            //restituisco vero
            return true;
        }
    }
    //altrimenti errore e restituisco falso
    return false;
}

//funzione per ottenere l utente appartenente alla lista di quelli appartenenti alla chat tramite id
export function getPersonaNellaChat(idUtente: number): Utente {
    //scorro tutte le persone nella chat selezionata
    for (let i = 0; i < this.listaPersoneMessaggi.length; ++i) {
        //verifico che l id della persona coincida con quello in input
        if (this.listaPersoneMessaggi[i].getIdUser() === idUtente) {
            return this.listaPersoneMessaggi[i];
        }
    }
    return null;
}