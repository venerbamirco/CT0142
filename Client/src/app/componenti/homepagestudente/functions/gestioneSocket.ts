import { Messaggio } from "src/app/classi/messaggio";
import { Utente } from "src/app/classi/user";

//configurazione socket
export function configurazioneSocket(): void {
    //dopo la connessione metto in attesa di ricezione di nuovi messaggi
    this.ss.connect().subscribe((m: Messaggio) => {
        //salvo il messaggio appena arrivato
        this.messaggioAppenaArrivato = new Messaggio(m).getContenuto();
        //memorizzo temporaneamente il messaggio per analizzarlo
        var messTemp = new Messaggio(m);
        //casi che non serve cambiare liste messaggi
        if ((messTemp.getDestinatario() !== 0 || (messTemp.getDestinatario() === 0 && this.inserzione && this.inserzione.getIdInserzione() !== messTemp.getIdInserzione())) && messTemp.getDestinatario() !== this.utenteLoggato.getIdUser() && messTemp.getMittente() !== this.utenteLoggato.getIdUser()) {
        }
        //altrimenti puo interessarmi o con una notifica o con un aggiornamento delle liste dei messaggi
        else {
            //aggiorno la lista delle persone nelle chat
            this.getListaUtentiChat();
            //solo la notifica se non ho aperto nessuna tipologia di chat
            if (!this.chatSingolaPersona && !this.chatPrivataInserzione && !this.chatPubblicaInserzione && messTemp.getDestinatario() === this.utenteLoggato.getIdUser()) {
                //ottengo i dati dell utente che ha mandato il messaggio all utente loggato
                this.us.getUtenteById(new Messaggio(m).getMittente()).subscribe((data) => {
                    this.utenteMessaggioAppenaArrvato = new Utente(data.utenti[0]).getNome() + " " + new Utente(data.utenti[0]).getCognome();
                }, (err) => {
                    //errore estrazione dati dell utente loggato
                    this.dettagliErrore.setMessage("Errore estrazione dati mittente messaggio");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione dati mittente messaggio " + JSON.stringify(err));
                });
            }
            //se sono dentro ad ua particolare chat
            else {
                //se sono nella chat con una singola persona
                if (this.chatSingolaPersona) {
                    this.getListaMessaggiPersona(this.idPersonaChatAttuale);
                }
                //se sono sulla chat privata di una inserzione
                else if (this.chatPrivataInserzione) {
                    this.getListaMessaggiInserzioneChatPrivata();
                }
                //se sono sulla chat pubblica di una inserzione
                else if (this.chatPubblicaInserzione) {
                    this.getListaMessaggiInserzioneChatPubblica();
                }
            }
        }
    });
}