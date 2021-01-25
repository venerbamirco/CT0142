//funzione per fare una nuova offerta all inserzione selezionata
export function nuovaOffertaSelezionata(): void {
    //aggiungo anche l id dell utente loggato alla nuova offerta
    this.nuovaOfferta.setIdUtente(this.utenteLoggato.getIdUser());
    //aggiungo anche l id dell inserzione selezionata
    this.nuovaOfferta.setIdInserzione(this.inserzione.getIdInserzione());
    //faccio la nuova offerta
    this.is.nuovaOfferta(this.nuovaOfferta).subscribe((data) => {
        //recupero tutti i dati
        this.recuperaDatiAggiornati();
    }, (err) => {
        //errore fare offerta nuova
        this.dettagliErrore.setMessage("Errore fare offerta nuova");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore fare offerta nuova " + JSON.stringify(err));
    });
}