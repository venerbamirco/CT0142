//funzione per estrarre le statistiche
export function getStatistiche(): void {
    //estraggo le statistiche
    this.ss.getStatistiche().subscribe((data) => {
        //memorizzo il numero di aste attive
        this.statistiche.push(data.inserzioniAttive.length);
        //memorizzo il numero di aste senza il raggiungimento del prezzo di riserva
        this.statistiche.push(data.inserzioniNonRaggiungimentoRiserva.length);
        //memorizzo il numero di aste con il raggiungimento del prezzo di riserva
        this.statistiche.push(data.inserzioniRaggiungimentoRiserva.length);
    }, (err) => {
        //errore estrazione statistiche
        this.dettagliErrore.setMessage("Errore estrazione statistiche");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione statistiche " + JSON.stringify(err));
    });
}