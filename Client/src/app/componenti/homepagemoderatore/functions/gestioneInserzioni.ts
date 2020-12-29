import { Inserzione } from "src/app/classi/inserzione";
import { Libro } from "src/app/classi/Libro";
import { Utente } from "src/app/classi/user";

//funzione per ottenere tutte le inserzioni dato che sono un moderatore
export function getListaInserzioni(): void {
    //resetto la lista delle varie inserzioni
    this.inserzioni = [];
    //resetto la lista dei vari libri
    this.libri = [];
    //ottengo la lista delle inserzioni
    this.is.getListaInserzioni().subscribe((data) => {
        //per ciascuna inserzione, la inserisco nella mia lista dato che un moderatore le deve poter vedere e modificare tutte
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //inserisco l inserzione nella lista
            this.inserzioni.push(new Inserzione(data.inserzioni[i]));
            //inserisco il libro che e sull inserzione appena letta nella lista dei libri
            this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                this.libri.push(new Libro(data1.libri[0]));
            });
        }
    }, (err) => {
        //errore estrazione di tutte le inserzioni 
        this.dettagliErrore.setMessage("Errore estrazione inserzioni");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni " + JSON.stringify(err));
    });
}

//funzione per settare l inserzione che il moderatore ha selezionato dall elenco
export function setInserzioneSelezionata(idInserzione: number): void {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (var i = 0; i < this.inserzioni.length; ++i) {
        //verifico che l id corrisponda a quella che il moderatore ha selezionato per aprire il popup
        if (this.inserzioni[i].idInserzione === idInserzione) {
            this.inserzione = new Inserzione(this.inserzioni[i])
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
                    this.utenteInserzioneCreata = new Utente(data.utenti[0]);
                    //devo estrarre anche i dati dell utente che ha fatto l ultima offerta
                    this.us.getUtenteById(this.inserzione.getUtentePrezzoAttuale()).subscribe((data) => {
                        //mi salvo i dati dell utente che ha fatto l ultima proposta
                        this.utenteInserzioneUltimaOfferta = new Utente(data.utenti[0]);
                    });
                }, (err) => {
                    //errore estrazione dell utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente creazione inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente creazione inserzione " + JSON.stringify(err));
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

//funzione per eliminare un inserzione
export function eliminaInserzione(): void {
    //elimino il libro collegato all'inserzione
    this.ls.eliminaLibro([this.inserzione.getLibro()]).subscribe(() => {
        //elimino l inserzione
        this.is.eliminaInserzione([this.inserzione.getIdInserzione()]).subscribe((data) => {
            //aggiorno i dati
            this.aggiornaDati();
        }, (err) => {
            //errore eliminazione inserzione
            this.dettagliErrore.setMessage("Errore eliminazione inserzione");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore eliminazione inserzione " + JSON.stringify(err));
        });
    }, (err) => {
        //errore eliminazione libro
        this.dettagliErrore.setMessage("Errore eliminazione libro");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore eliminazione libro " + JSON.stringify(err));
    });
}

//funzione per modificare i dati dell inserzione
export function modificaInserzione(): void {
    //aggiorno le due date evitando formati diversi che mi danno eventuali errori
    this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
    this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
    //estraggo i dati dell utente che ha creato l inserzione dallo username per vedere che ce ne sia uno valido
    this.us.getUtenteByUsername(this.utenteInserzioneCreata.getUsername()).subscribe((data) => {
        //verifico di aver trovato un utente solo con quello username altrimenti errore
        if (data.utenti.length === 1) {
            //aggiorno l inserzione con l id dell utente nuovo che la ha creata
            this.inserzione.setUtente(data.utenti[0].idUser);
            //estraggo i dati dell utente che ha fatto l ultima offerta all inserzione dallo username per vedere che ce ne sia uno valido
            this.us.getUtenteByUsername(this.utenteInserzioneUltimaOfferta.getUsername()).subscribe((data) => {
                //verifico di aver trovato un utente solo con quello username altrimenti errore
                if (data.utenti.length === 1) {
                    //aggiorno l id dell utente che ha fatto l ultima offerta
                    this.inserzione.setUtentePrezzoAttuale(data.utenti[0].idUser);
                    //modifico i dati dell inserzione
                    this.is.modificaInserzione(this.inserzione).subscribe((data) => {
                        console.log(JSON.stringify(data));
                        //modifico i dati del libro
                        this.ls.modificaLibro(this.libro).subscribe((data) => {
                            //aggiorno i dati
                            this.aggiornaDati();
                        }, (err) => {
                            //errore modifica libro
                            this.dettagliErrore.setMessage("Errore modifica libro");
                            this.dettagliErrore.setReason(JSON.stringify(err));
                            console.log("Errore modifica libro " + JSON.stringify(err));
                        });;
                    }, (err) => {
                        //errore modifica dati inserzione
                        this.dettagliErrore.setMessage("Errore modifica dati inserzione");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore modifica dati inserzione " + JSON.stringify(err));
                    });
                }
                //se non ce nessun utente o ci sono piu utenti con quello username errore
                else {
                    //errore estrazione di tutte le inserzioni 
                    this.dettagliErrore.setMessage("Errore modifica dati inserzione: nessun utente con quello username");
                    this.dettagliErrore.setReason("");
                    console.log("Nessun utente con quello username");
                }
            });
        }
        //se non ce nessun utente o ci sono piu utenti con quello username errore
        else {
            //errore estrazione di tutte le inserzioni 
            this.dettagliErrore.setMessage("Errore modifica dati inserzione: nessun utente con quello username");
            this.dettagliErrore.setReason("");
            console.log("Nessun utente con quello username");
        }
    });
}