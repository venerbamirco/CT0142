//funzione per inserire il nuovo moderatore
export function inserisciModeratore(): void {
    //inserisco il moderatore
    this.us.inserisciModeratore(this.moderatore).subscribe((data) => {
        //aggiorno i dati
        this.aggiornaDati();
    }, (err) => {
        //errore inserimento moderatore
        this.dettagliErrore.setMessage("Errore inserimento moderatore");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore inserimento moderatore " + JSON.stringify(err));
    });
}