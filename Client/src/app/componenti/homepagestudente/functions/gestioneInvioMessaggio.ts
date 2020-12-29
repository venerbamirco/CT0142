import { Messaggio } from "src/app/classi/messaggio";

//funzione per inviare il messaggio
export function inviaMessaggio(): void {
    //imposto i campi del nuovo messaggio
    this.messaggioDaInviare.setDestinatario(this.idUtenteDestinazione);
    this.messaggioDaInviare.setMittente(this.utenteLoggato.getIdUser());
    this.messaggioDaInviare.setData(new Date());
    this.messaggioDaInviare.setMessaggioRiferimento(this.messaggioRiferimento.getIdMessaggio());
    this.messaggioDaInviare.setOggetto("vuoto");
    //verifico se sono sulla chat privata con una persona
    if (this.chatSingolaPersona) {
        this.messaggioDaInviare.setIdInserzione(this.messaggioRiferimento.getIdInserzione());
    }
    //verifico se e una chat privata dell inserzione
    else if (this.chatPrivataInserzione) {
        this.messaggioDaInviare.setIdInserzione(this.inserzione.getIdInserzione());
    }
    //verifico se e una chat pubblica dell inserzione
    else if (this.chatPubblicaInserzione) {
        this.messaggioDaInviare.setIdInserzione(this.inserzione.getIdInserzione());
    }
    //invio il messaggio
    this.ms.inviaMessaggio(this.messaggioDaInviare).subscribe((data) => {
        //inizializzazione
        this.messaggioRiferimento.setIdMessaggio(0);
        this.messaggioRiferimento.setContenuto("");
        this.messaggioRiferimento.setIdInserzione(0);
    }, (err) => {
        //errore invio messaggio
        this.dettagliErrore.setMessage("Errore inviare il messaggio");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore inviare il messaggio: " + JSON.stringify(err));
    });
}

//funzione per impostare l id dell messaggio di riferimento prima di inviarlo
export function setMessaggioRiferimento(idMessaggio: number): void {
    //scorro la lista di messaggi
    for (let i = 0; i < this.listaMessaggi.length; ++i) {
        //se l id coincide
        if (idMessaggio === this.listaMessaggi[i].getIdMessaggio()) {
            //mi salvo i dati del messaggio trovato
            this.messaggioRiferimento.setIdMessaggio(this.listaMessaggi[i].getIdMessaggio());
            this.messaggioRiferimento.setContenuto(this.listaMessaggi[i].getContenuto());
            this.messaggioRiferimento.setIdInserzione((typeof (this.listaMessaggi[i].getIdInserzione()) !== "undefined") ? (this.listaMessaggi[i].getIdInserzione()) : (0));
            return;
        }
    }
    //azzero i campi perche non uso il riferimento
    this.messaggioRiferimento.setIdMessaggio(0);
    this.messaggioRiferimento.setContenuto("");
    this.messaggioRiferimento.setIdInserzione(0);
}

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