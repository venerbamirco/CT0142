//classe per la gestione dell inserzione
export class Inserzione {
    idInserzione?: number;
    utente?: number;
    libro?: number;
    dataInizio?: string;
    dataFine?: string;
    prezzoIniziale?: number;
    prezzoAttuale?: number;
    prezzoRiserva?: number;
    utentePrezzoAttuale?: number;
    vincitore?: number;

    //inizializzzazione inserzione
    constructor(inserzione?: Inserzione) {
        if (inserzione) {
            if (inserzione.idInserzione) this.setIdInserzione(inserzione.idInserzione);
            if (inserzione.utente) this.setUtente(inserzione.utente);
            if (inserzione.libro) this.setLibro(inserzione.libro);
            if (inserzione.dataInizio) this.setDataInizio(inserzione.dataInizio);
            if (inserzione.dataFine) this.setDataFine(inserzione.dataFine);
            if (inserzione.prezzoIniziale) this.setPrezzoIniziale(inserzione.prezzoIniziale);
            if (inserzione.prezzoAttuale) this.setPrezzoAttuale(inserzione.prezzoAttuale);
            if (inserzione.prezzoRiserva) this.setPrezzoRiserva(inserzione.prezzoRiserva);
            if (inserzione.utentePrezzoAttuale) this.setUtentePrezzoAttuale(inserzione.utentePrezzoAttuale);
            if (inserzione.vincitore) this.setVincitore(inserzione.vincitore);
        }
    }

    //metodo setter per impostare l id dell inserzione
    setIdInserzione(idInserzione: number): void {
        this.idInserzione = idInserzione;
    }

    //metodo setter per impostare l id dell utente
    setUtente(utente: number): void {
        this.utente = utente;
    }

    //metodo setter per impostare l id dell utente che ha fatto l offerta
    setUtentePrezzoAttuale(utente: number): void {
        this.utentePrezzoAttuale = utente;
    }

    //metodo setter per impostare il vincitore
    setVincitore(utente: number): void {
        this.vincitore = utente;
    }

    //metodo setter per impostare l id del libro associato all inserzione
    setLibro(libro: number): void {
        this.libro = libro;
    }

    //metodo setter per impostare la data di inizio
    setDataInizio(dataInizio: string): void {
        this.dataInizio = dataInizio;
    }

    //metodo setter per impostare la data di fine
    setDataFine(dataFine: string): void {
        this.dataFine = dataFine;
    }

    //metodo setter per impostare il prezzo iniziale
    setPrezzoIniziale(prezzoIniziale: number): void {
        this.prezzoIniziale = prezzoIniziale;
    }

    //metodo setter per impostare il prezzo attuale
    setPrezzoAttuale(prezzoAttuale: number): void {
        this.prezzoAttuale = prezzoAttuale;
    }

    //metodo setter per impostare il prezzo riserva
    setPrezzoRiserva(prezzoRiserva: number): void {
        this.prezzoRiserva = prezzoRiserva;
    }

    //metodo getter per estrarre l id dell utente
    getUtente(): number {
        return this.utente;
    }

    //metodo getter per estrarre l id dell utente che ha fatto l offerta
    getUtentePrezzoAttuale(): number {
        return this.utentePrezzoAttuale;
    }

    //metodo getter per estrarre il vincitore
    getVincitore(): number {
        return this.vincitore;
    }

    //metodo getter per estrarre l id del libro associato all inserzione
    getLibro(): number {
        return this.libro;
    }

    //metodo getter per estrarre la data di inizio
    getDataInizio(): Date {
        return new Date(this.dataInizio);
    }

    //metodo getter per estrarre la data di fine
    getDataFine(): Date {
        return new Date(this.dataFine);
    }

    //metodo getter per estrarre il prezzo iniziale
    getPrezzoIniziale(): number {
        return this.prezzoIniziale;
    }

    //metodo getter per estrarre il prezzo attuale
    getPrezzoAttuale(): number {
        return this.prezzoAttuale;
    }

    //metodo getter per estrarre il prezzo riserva
    getPrezzoRiserva(): number {
        return this.prezzoRiserva;
    }

    //metodo getter per avere l id dell inserzione
    getIdInserzione(): number {
        return this.idInserzione;
    }

    //metodo per vedere se l inserzione e scaduta
    isScaduta(): boolean {
        //guardo se sono nello stesso anno
        if (new Date(this.dataFine).getFullYear() === new Date().getFullYear()) {
            //guardo se sono nello stesso mese
            if (new Date(this.dataFine).getMonth() === new Date().getMonth()) {
                //guardo se sono nello stesso giorno
                if (new Date(this.dataFine).getDate() === new Date().getDate()) {
                    //scade oggi ma ce ancora tempo
                    return false;
                }
                //se mancano ancora dei giorni allo scadere
                else if (new Date(this.dataFine).getDate() > new Date().getDate()) {
                    return false;
                }
            }
            //se mancano ancora dei mesi allo scadere
            else if (new Date(this.dataFine).getMonth() > new Date().getMonth()) {
                return false;
            }
        }
        //se mancano ancora degli anni allo scadere
        else if (new Date(this.dataFine).getFullYear() > new Date().getFullYear()) {
            return false;
        }
        //se arrivo qua vuol dire che e scaduta
        return true;
    }

    //funzione per vedere se l inserzione e stata vinta dall utente loggato
    isVinta(utente: number): boolean {
        //guardo se l inserzione e scaduta altrimenti si possono fare ancora offerte
        if (this.isScaduta()) {
            //guardo che non l abbia creata lo stesso utente che ha fatto l offerta
            if (this.utente !== this.utentePrezzoAttuale) {
                //guardo se l utente che ha fatto l ultima offerta sia quello loggato
                if (this.utentePrezzoAttuale === utente) {
                    //guardo se viene superato il prezzo di riserva
                    if (this.prezzoAttuale > this.prezzoRiserva) {
                        //allora e stata vinta
                        return true;
                    }
                }
            }
        }
        //altrimenti non e stata vinta
        return false;
    }

    //funzione per vedere se l inserzione e stata venduta
    IsVenduta(proprietario: number): boolean {
        //guardo se l inserzione e scaduta altrimenti si possono fare ancora offerte
        if (this.isScaduta()) {
            //guardo che non l abbia creata lo stesso utente che ha fatto l offerta
            if (this.utente !== this.utentePrezzoAttuale) {
                //guardo se l utente che la ha creata sia quello loggato
                if (this.utente === proprietario) {
                    //guardo se viene superato il prezzo di riserva
                    if (this.prezzoAttuale > this.prezzoRiserva) {
                        //allora e stata vinta
                        return true;
                    }
                }
            }
        }
        //altrimenti non e stata vinta
        return false;
    }

    //funzione per vedere se l inserzione e stata vinta senza sapere da chi
    isVintaGenerico(): boolean {
        //guardo se l inserzione e scaduta altrimenti si possono fare ancora offerte
        if (this.isScaduta()) {
            //guardo che non l abbia creata lo stesso utente che ha fatto l ultima offerta
            if (this.utente !== this.utentePrezzoAttuale) {
                //guardo se viene superato il prezzo di riserva
                if (this.prezzoAttuale > this.prezzoRiserva) {
                    //allora e stata vinta
                    return true;
                }
            }
        }
        //altrimenti non e stata vinta
        return false;
    }

}