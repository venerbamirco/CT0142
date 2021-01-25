import { Messaggio } from "src/app/classi/messaggio";
import { Utente } from "src/app/classi/user";

//funzione per selezionare gli utenti che l utente loggato ha chattato ordinato per date decrescenti
export function getListaUtentiChat(): void {
    //inizializzo la lista
    this.studentiConChat = [];
    //variabile temporanea per indici degli studenti con chat
    var indiciStudentiChat: number[] = [];
    //variabile temporanea per la lista dei messaggi
    var listaMessaggiTemp: Messaggio[] = new Array();
    //estraggo i messaggi con mittente utente loggato senza differenziare per id inserzione
    this.ms.getListaMessaggi(this.utenteLoggato.getIdUser(), null, null).subscribe((data) => {
        //scorro tutti i messaggi
        for (var i = 0; i < data.messaggi.length; ++i) {
            //aggiungo ciascun messaggio nella lista dei messaggi temporanea
            listaMessaggiTemp.push(new Messaggio(data.messaggi[i]));
        }
        //estraggo i messaggi con destinatario utente loggato senza differenziare per id inserzione
        this.ms.getListaMessaggi(null, this.utenteLoggato.getIdUser(), null).subscribe((data) => {
            //scorro tutti i messaggi
            for (let i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi temporanea
                listaMessaggiTemp.push(new Messaggio(data.messaggi[i]));
            }
            //ordino i messaggi pero in ordine decrescente cosi inserisco gli utenti nell ordine degli ultimi messaggi
            listaMessaggiTemp = listaMessaggiTemp.sort(
                (m1: Messaggio, m2: Messaggio): number => {
                    if (m1.data > m2.data) {
                        return -1;
                    }
                    return 1;
                }
            );
            //per tutti i messaggi trovati
            for (let i = 0; i < listaMessaggiTemp.length; ++i) {
                //se l utente loggato corrisponde al mittente
                if (this.utenteLoggato.getIdUser() === listaMessaggiTemp[i].getMittente()) {
                    //se l utente del messaggio attuale non è nella lista degli studenti con chat
                    if (!this.isUtentePresente(listaMessaggiTemp[i].getDestinatario(), indiciStudentiChat)) {
                        //inserisco il suo id nella lista
                        indiciStudentiChat.push(listaMessaggiTemp[i].getDestinatario());
                    }
                }
                //se invece l utente loggato corrisponde al destinatario
                else if (this.utenteLoggato.getIdUser() === listaMessaggiTemp[i].getDestinatario()) {
                    //se l utente del messaggio attuale non è nella lista degli studenti con chat
                    if (!this.isUtentePresente(listaMessaggiTemp[i].getMittente(), indiciStudentiChat)) {
                        //inserisco il suo id nella lista
                        indiciStudentiChat.push(listaMessaggiTemp[i].getMittente());
                    }
                }
            }
            for (let i = 0; i < indiciStudentiChat.length; ++i) {
                //controllo che non sia l id pubblic
                if (indiciStudentiChat[i] !== 0) {
                    //trovo i dati dell utente dall id
                    this.us.getUtenteById(indiciStudentiChat[i]).subscribe((data) => {
                        //verifico che abbia trovato esattamente un utente
                        if (data.utenti.length === 1) {
                            //inserisco l utente nella lista degli utenti con cui l utnte loggato ha chattato
                            this.studentiConChat.push(new Utente(data.utenti[0]))
                        }
                        //se gli utenti trovati non sono pari ad 1
                        else {
                            this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 862");
                            this.dettagliErrore.setReason("");
                            console.log("Errore piu utenti con lo stesso id ")
                        }
                    }, (err) => {
                        //errore estrazione utente dall id
                        this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore estrazione destinatario dall id " + err)
                    });
                }
            }
        }, (err) => {
            //errore estrazione prima parte messaggi
            this.dettagliErrore.setMessage("Errore prima parte messaggi");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore prima parte messaggi" + JSON.stringify(err));
        });
    }, (err) => {
        //errore estrazione seconda parte messaggi
        this.dettagliErrore.setMessage("Errore seconda parte messaggi");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore seconda parte messaggi" + JSON.stringify(err));
    });
}