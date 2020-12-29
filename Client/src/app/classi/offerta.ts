//classe per la gestione dell offerta
export class Offerta {
    idInserzione?: number;
    idUtente?: number;
    nuovaOfferta?: number;

    //inizializzzazione offerta
    constructor(offerta?: Offerta) {
        if (offerta) {
            if (offerta.idInserzione) this.setIdInserzione(offerta.idInserzione);
            if (offerta.idUtente) this.setIdUtente(offerta.idUtente);
            if (offerta.nuovaOfferta) this.setNuovaOfferta(offerta.nuovaOfferta);
        }
    }

    getIdInserzione(): number {
        return this.idInserzione;
    }

    getIdUtente(): number {
        return this.idUtente;
    }

    getNuovaOfferta(): number {
        return this.nuovaOfferta;
    }

    setIdInserzione(idInserzione: number): void {
        this.idInserzione = idInserzione;
    }

    setIdUtente(idUtente: number): void {
        this.idUtente = idUtente;
    }

    setNuovaOfferta(nuovaOfferta: number): void {
        this.nuovaOfferta = nuovaOfferta;
    }

}