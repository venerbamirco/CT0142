import { Utente } from "src/app/classi/user";

//funzione per aggiornare tutti i dati
export function aggiornaDati(): void {
    //azzero i dati gia esistenti
    this.statistiche = [];
    this.libri = [];
    this.inserzioni = [];
    this.utenti = [];
    this.moderatore = new Utente();
    this.dettagliErrore.setMessage("");
    this.dettagliErrore.setReason("");
    //annullo il filtro per le inserzioni
    this.annullaFiltro();
    //ottengo la lista di tutte le inserzioni
    this.getListaInserzioni();
    //ottengo la lista di studenti
    this.getListaStudenti();
    //ottengo le statistiche
    this.getStatistiche();
}