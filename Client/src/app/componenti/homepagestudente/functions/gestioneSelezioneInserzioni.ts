import { Inserzione } from "src/app/classi/inserzione";
import { Libro } from "src/app/classi/Libro";
import { Utente } from "src/app/classi/user";

//funzione per settare l inserzione vinta che l utente ha selezionato dall elenco
export function setInserzioneVintaSelezionata(idInserzione: number): void {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniVinte.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniVinte[i].idInserzione === idInserzione) {
            this.inserzione = new Inserzione(this.inserzioniVinte[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new Libro(data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new Utente(data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}

//funzione per settare l inserzione partecipata dall elenco
export function setInserzionePartecipataSelezionata(idInserzione: number): void {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniPartecipate.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniPartecipate[i].idInserzione === idInserzione) {
            this.inserzione = new Inserzione(this.inserzioniPartecipate[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new Libro(data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new Utente(data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l' inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l' inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}

//funzione per settare l inserzione creata che l utente ha selezionato dall elenco
export function setInserzioneCreataSelezionata(idInserzione: number): void {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniCreate.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniCreate[i].idInserzione === idInserzione) {
            this.inserzione = new Inserzione(this.inserzioniCreate[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new Libro(data.libri[0]);
                //devo estrarmi anche i dati dell utente che ha fatto l ultima offerta
                this.us.getUtenteById(this.inserzione.getUtentePrezzoAttuale()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new Utente(data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha fatto l ultima offerta
                    this.dettagliErrore.setMessage("Errore estrazione utente ultima offerta ");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente ultima offerta " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}

//funzione per settare l inserzione in vendita che l utente loggato ha premuto per visualizzare i dettagli
export function setInserzioneInVenditaSelezionata(idInserzione: number): void {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniInVendita.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniInVendita[i].idInserzione === idInserzione) {
            this.inserzione = new Inserzione(this.inserzioniInVendita[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new Libro(data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new Utente(data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l' inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l' inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}

//funzione per settare l inserzione venduta che l utente loggato ha premuto per visualizzare i dettagli
export function setInserzioneVendutaSelezionata(idInserzione: number): void {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniVendute.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniVendute[i].idInserzione === idInserzione) {
            this.inserzione = new Inserzione(this.inserzioniVendute[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new Libro(data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new Utente(data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l' inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l' inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}