import { Inserzione } from "src/app/classi/inserzione";

//funzione per vedere se il filtro e attivato o disattivato
export function verificaFiltro(): boolean {
    //se l oggetto e vuoto restituisco vero
    if (this.filtraggioInserzioni.nomeLibro === "" && this.filtraggioInserzioni.corsoDiStudi === "" && this.filtraggioInserzioni.areaGeografica === "" && this.filtraggioInserzioni.universita === "" && this.filtraggioInserzioni.venditore === "" && this.filtraggioInserzioni.prezzoAttualeMinimo === "" && this.filtraggioInserzioni.prezzoAttualeMassimo === "") {
        return true;
    }
    //se l oggetto non e vuoto restituisco falso
    return false;
}

//funzione per annullare il filtro
export function annullaFiltro(): void {
    //azzero l oggetto per il filtraggio
    this.filtraggioInserzioni.nomeLibro = "";
    this.filtraggioInserzioni.corsoDiStudi = "";
    this.filtraggioInserzioni.universita = "";
    this.filtraggioInserzioni.areaGeografica = "";
    this.filtraggioInserzioni.venditore = "";
    this.filtraggioInserzioni.prezzoAttualeMinimo = "";
    this.filtraggioInserzioni.prezzoAttualeMassimo = "";
    //recupero la lista di inserzioni in vendita
    this.getListaInserzioniInVendita();
}

//funzione per filtrare le inserzioni in vendita
export function filtraInserzioni(): void {
    //resetto la lista delle varie inserzioni
    this.inserzioniInVendita = [];
    //resetto la lista dei vari libri
    this.libriInVendita = [];
    //richiamo il service per ottenere la lista di inserzioni filtrate
    this.is.filtraInserzioni(this.filtraggioInserzioni).subscribe((data) => {
        //mi resistuisce tutte le inserzioni perche faccio tramite controllo lato client se e stata vinta oppure se e in vendita rispettando certi termini
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se l inserzione attuale non e stata creata dall utente attuale
            if (data.inserzioni[i].utente !== this.utenteLoggato.getIdUser()) {
                //verifico inoltre che l utente non abbia gia fatto una proposta perche altrimenti viene fuori nella sezione proposte
                if (data.inserzioni[i].utentePrezzoAttuale !== this.utenteLoggato.getIdUser()) {
                    //se non e ancora scaduta
                    if (!((new Inserzione(data.inserzioni[i])).isScaduta())) {
                        //inserisco l inserzione nella lista giusta
                        this.inserzioniInVendita.push(new Inserzione(data.inserzioni[i]));
                        //inserisco il libro in vendita nella lista relativa
                        this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                            this.libriInVendita.push(data1.libri[0]);
                        }, (err) => {
                            //errore estrazione libro dell inserzione in filtraggio
                            this.dettagliErrore.setMessage("Errore estrazione libro del filtraggio inserzioni");
                            this.dettagliErrore.setReason(JSON.stringify(err));
                            console.log("Errore estrazione libro del filtraggio inserzioni " + JSON.stringify(err));
                        });
                    }
                }
            }
        }
    }, (err) => {
        //errore filtraggio inserzioni
        this.dettagliErrore.setMessage("Errore filtraggio inserzioni");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore filtraggio inserzioni " + JSON.stringify(err));
    });
}