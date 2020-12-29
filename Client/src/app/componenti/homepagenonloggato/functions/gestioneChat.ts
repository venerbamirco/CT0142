import { Messaggio } from "src/app/classi/messaggio";
import { Utente } from "src/app/classi/user";

//funzione per ottenere il messaggio di riferimento rispetto ad un messaggio dato in input
export function getContenutoMessaggioRiferimento(messaggio: Messaggio): Messaggio {
    //controllo di avere un messaggio valido in input
    if (messaggio) {
        //scorro i messaggi in quanto il messaggio di riferimento fa parte della stessa tipologia di messaggi che avevo estratto precedentemente
        for (let i = 0; i < this.listaMessaggi.length; ++i) {
            //se l id di riferimento corrisponde
            if (messaggio.getMessaggioRiferimento() === this.listaMessaggi[i].getIdMessaggio()) {
                return this.listaMessaggi[i];
            }
        }
    }
    return null;
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

//funzione per la lista dei messaggi sulla chat pubblica presente nell popup dell inserzione
export function getListaMessaggiInserzioneChatPubblica(): void {
    //inizializzo la lista dei messaggi
    this.listaMessaggi = [];
    //inizializzo la lista delle persone dentro alla chat
    this.listaPersoneMessaggi = [];
    //creo una variabile temporanea di indici degli utenti dentro alla chat
    var listaIdUtenti: number[] = [];
    //controllo che l'inserzione sia selezionata per poter accedere ai campi
    if (this.inserzione) {
        //estraggo i messaggi riferiti solo all inserzione e allo 0 come utente perche pubblico
        this.ms.getListaMessaggi(null, 0, this.inserzione.getIdInserzione()).subscribe((data) => {
            //scorro tutti i messaggi
            for (var i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi
                this.listaMessaggi.push(new Messaggio(data.messaggi[i]));
            }
            //ordino i messaggi in ordine di id dato che sono autoincrement
            this.listaMessaggi = this.listaMessaggi.sort(
                (m1: Messaggio, m2: Messaggio): number => {
                    if (m1.getIdMessaggio() >= m2.getIdMessaggio()) {
                        return 1;
                    }
                    return -1;
                }
            );
            //scorro tutti i messaggi inerenti alla chat
            for (let i = 0; i < this.listaMessaggi.length; ++i) {
                //controllo se l id del mittente non lo ho gia trovato allora lo inserisco
                if (!this.isUtentePresente(this.listaMessaggi[i].getMittente(), listaIdUtenti)) {
                    listaIdUtenti.push(this.listaMessaggi[i].getMittente());
                }
            }
            //scorro tutti gli id delle persone dentro alla chat
            for (let i = 0; i < listaIdUtenti.length; ++i) {
                //estraggo ciascun utente dall id
                this.us.getUtenteById(listaIdUtenti[i]).subscribe((data) => {
                    //verifico che abbia trovato esattamente un utente con quell id
                    if (data.utenti.length === 1) {
                        //aggiungo l utente nella lista delle persone dentro a quella chat
                        this.listaPersoneMessaggi.push(new Utente(data.utenti[0]));
                    }
                    //se gli utenti trovati non sono pari ad 1
                    else {
                        this.dettagliErrore.setMessage("Errore nessun utente con quell id");
                        this.dettagliErrore.setReason("");
                        console.log("Errore piu utenti con lo stesso id ");
                    }
                }, (err) => {
                    //errore estrazione utente dall id
                    this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione destinatario dall id " + err)
                });
            }
            //imposto id utente pubblico
            this.idUtenteDestinazione = 0;
            this.destinatarioMessaggiChatSelezionata = "pubblico";
        }, (err) => {
            //errore estrazione seconda parte messaggi
            this.dettagliErrore.setMessage("Errore seconda parte messaggi");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore seconda parte messaggi" + JSON.stringify(err));
        });
    }
    //se non e valida errore
    else {
        //errore inserzione selezionata non valida
        this.dettagliErrore.setMessage("Errore estrazione messaggi da inserzione non selezionata");
        this.dettagliErrore.setReason("");
        console.log("Errore estrazione messaggi da inserzione non selezionata");
    }
}