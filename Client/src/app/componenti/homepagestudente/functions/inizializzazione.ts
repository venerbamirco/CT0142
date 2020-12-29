import { Inserzione } from "src/app/classi/inserzione";
import { Libro } from "src/app/classi/Libro";
import { Offerta } from "src/app/classi/offerta";
import { Utente } from "src/app/classi/user";

//funzione per init 
export function initDati(): void {
    //ottengo i dati dell utente loggato
    this.us.getUtenteById(this.us.getIdUtente()).subscribe((data) => {
        //configurazione dati utente loggato
        this.utenteLoggato = new Utente(data.utenti[0]);
        //configurazione socket
        this.configurazioneSocket();
        //ottengo i dati aggiornati
        this.recuperaDatiAggiornati();
    }, (err) => {
        //errore estrazione dati dell utente loggato
        this.dettagliErrore.setMessage("Errore estrazione dati utente loggato");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione dati utente loggato " + JSON.stringify(err));
    });
}

//funzione per aggiornare i dati
export function recuperaDatiAggiornati(): void {
    //azzeramento variabili
    this.azzeramentoVariabili();
    //azzero il filtro e recupero le inserzioni in vendita
    this.annullaFiltro();
    //recupero le inserzioni create proposte e vinte
    this.getListaInserzioniCreateProposte();
    //recupero le inserzioni che l utente loggato ha partecipato
    this.getListaInserzioniPartecipate();
    //recupero la lista di inserzioni che l utente ha venduto
    this.getListaInserzioniVendute();
    //recupero la lista di persone con chat dalla lista dei messaggi
    this.getListaUtentiChat();
}

//funzione per inizializzazione variabili
export function azzeramentoVariabili(): void {
    this.nuovaOfferta = new Offerta();
    this.inserzione = new Inserzione();
    this.libro = new Libro();
    this.utente = new Utente();
    this.messaggioRiferimento.setIdMessaggio(0);
    this.messaggioRiferimento.setContenuto("");
    this.messaggioRiferimento.setIdInserzione(0);
    this.chatSingolaPersona = false;
    this.chatPrivataInserzione = false;
    this.chatPubblicaInserzione = false;
    this.dettagliErrore.setMessage("");
    this.dettagliErrore.setReason("");
}