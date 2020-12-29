import { Inserzione } from "src/app/classi/inserzione";

//funzione per ottenere tutte le inserzioni create e quelle dove ce una proposta e quelle vinte
export function getListaInserzioniCreateProposte(): void {
    //resetto la lista delle varie inserzioni
    this.inserzioniCreate = [];
    this.inserzioniOfferteFatte = [];
    this.inserzioniVinte = [];
    //resetto la lista dei vari libri
    this.libriCreati = [];
    this.libriOfferte = [];
    this.libriVinti = [];
    //ottengo la lista delle inserzioni e poi guardo io dove metterle
    this.is.getListaInserzioniCreateProposte().subscribe((data) => {
        //dato che mi resistuisce le inserzioni dove l utente attuale le ha create OPPURE ha fatto un offerta le devo analizzare
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se l inserzione attuale e stata creata dall utente attuale
            if (data.inserzioni[i].utente === this.utenteLoggato.getIdUser()) {
                this.inserzioniCreate.push(new Inserzione(data.inserzioni[i]));
                //inserisco il libro creato nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriCreati.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
            //se l inserzione attuale ha la proposta del prezzo attuale dall utente loggato che e diverso dal creatore e se non e scaduta
            else if (data.inserzioni[i].utente !== this.utenteLoggato.getIdUser() && data.inserzioni[i].utentePrezzoAttuale === this.utenteLoggato.getIdUser() && !(new Inserzione(data.inserzioni[i]).isScaduta())) {
                this.inserzioniOfferteFatte.push(new Inserzione(data.inserzioni[i]));
                //inserisco il libro con l offerta fatta nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriOfferte.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
            //se l inserzione attuale ha la proposta del prezzo attuale dall utente loggato che e diverso dal creatore e se e scaduta vuol dire che e stata vinta
            else if (new Inserzione(data.inserzioni[i]).isVinta(this.utenteLoggato.getIdUser())) {
                this.inserzioniVinte.push(new Inserzione(data.inserzioni[i]));
                //inserisco il libro vinto nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriVinti.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
        }
    }, (err) => {
        //errore estrazione inserzioni
        this.dettagliErrore.setMessage("Errore estrazione inserzioni");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni " + JSON.stringify(err));
    });
}

//funzione per ottenere tutte le inserzioni che l utente loggato ha partecipato
export function getListaInserzioniPartecipate(): void {
    //resetto la lista delle varie inserzioni
    this.inserzioniPartecipate = [];
    //resetto la lista dei vari libri
    this.libriPartecipate = [];
    //ottengo la lista degli id delle inserzioni che ha partecipato l utente loggato
    this.us.getUtenteById(this.utenteLoggato.getIdUser()).subscribe((data) => {
        //estraggo gli indici delle inserzioni che ha partecipato l utente loggato
        var listaIdInserzioniPartecipate = new Array();
        for (let i = 0; i < data.utenti[0].astePartecipate.toString().split(',').length; ++i) {
            listaIdInserzioniPartecipate.push(Number(data.utenti[0].astePartecipate.toString().split(',')[i]));
        }
        //ottengo la lista delle inserzioni dall id precedentemente estratto
        this.is.getListaInserzioniPartecipate(listaIdInserzioniPartecipate).subscribe((data) => {
            //per tutte le inserzioni le inserisco nella lista giusta
            for (var i = 0; i < data.inserzioni.length; ++i) {
                //inserisco l inserzione nella lista giusta
                this.inserzioniPartecipate.push(new Inserzione(data.inserzioni[i]));
                //inserisco il libro in vendita nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriPartecipate.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
        }, (err) => {
            //errore estrazione lista inserzioni
            this.dettagliErrore.setMessage("Errore estrazione lista inserzioni");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore estrazione lista inserzioni " + JSON.stringify(err));
        });
    }, (err) => {
        //errore estrazione lista id inserzioni partecipate
        this.dettagliErrore.setMessage("Errore estrazione lista id inserzioni partecipate");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione lista id inserzioni partecipate " + JSON.stringify(err));
    });
}

//funzione per ottenere tutte le inserzioni in vendita e quindi non scadute
export function getListaInserzioniInVendita(): void {
    //resetto la lista delle varie inserzioni
    this.inserzioniInVendita = [];
    //resetto la lista dei vari libri
    this.libriInVendita = [];
    //ottengo la lista delle inserzioni in vendita
    this.is.getListaInserzioniInVendita().subscribe((data) => {
        //mi resistuisce tutte le inserzioni perche faccio tramite controllo lato client se e stata vinta oppure se e in vendita rispettando certi termini
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se l inserzione attuale non e stata creata dall utente attuale
            if (data.inserzioni[i].utente !== this.utenteLoggato.getIdUser()) {
                //verifico inoltre che l utente non abbia gia fatto una proposta perche altrimenti viene fuori nella sezione proposte
                if (data.inserzioni[i].utentePrezzoAttuale !== this.utenteLoggato.getIdUser()) {
                    //se non e ancora scaduta
                    if (!((new Inserzione(data.inserzioni[i])).isScaduta()) && new Inserzione(data.inserzioni[i]).getDataInizio() <= new Date()) {
                        //inserisco l inserzione nella lista giusta
                        this.inserzioniInVendita.push(new Inserzione(data.inserzioni[i]));
                        //inserisco il libro in vendita nella lista relativa
                        this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                            this.libriInVendita.push(data1.libri[0]);
                        }, (err) => {
                            //errore estrazione libro dell inserzione
                            this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                            this.dettagliErrore.setReason(JSON.stringify(err));
                            console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                        });
                    }
                }
            }
        }
    }, (err) => {
        //errore estrazione inserzioni in vendita
        this.dettagliErrore.setMessage("Errore estrazione inserzioni in vendita");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni in vendita " + JSON.stringify(err));
    });
}

//funzione per ottenere tutte le inserzioni vendute
export function getListaInserzioniVendute(): void {
    //resetto la lista delle varie inserzioni
    this.inserzioniVendute = [];
    //resetto la lista dei vari libri
    this.libriVenduti = [];
    //ottengo la lista delle inserzioni create
    this.is.getListaInserzioniCreateProposte().subscribe((data) => {
        //scorro le varie inserzioni
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se l inserzione attuale è stata creata dall utente loggato
            if (data.inserzioni[i].utente === this.utenteLoggato.getIdUser()) {
                //variabile temporanea per creare l oggetto inserzione per sfruttare alcune funzioni
                var inserzioneTemp: Inserzione = new Inserzione(data.inserzioni[i]);
                //guardo se l inserzione e stata venduta
                if (inserzioneTemp.IsVenduta(this.utenteLoggato.getIdUser())) {
                    this.inserzioniVendute.push(inserzioneTemp);
                    //inserisco il libro venduto nella lista relativa
                    this.ls.getLibroById(inserzioneTemp.getLibro()).subscribe((data1) => {
                        this.libriVenduti.push(data1.libri[0]);
                    }, (err) => {
                        //errore estrazione libro dell inserzione
                        this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                    });
                }
            }
        }
    }, (err) => {
        //errore estrazione inserzioni create
        this.dettagliErrore.setMessage("Errore estrazione inserzioni create");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni create " + JSON.stringify(err));
    });
}