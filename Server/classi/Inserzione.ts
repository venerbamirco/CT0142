import mongoose = require("mongoose");
import autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection("mongodb://localhost:27017/database");
autoIncrement.initialize(connection);

export interface Inserzione extends mongoose.Document {
    idInserzione: number,
    utente: number,
    libro: number,
    dataInizio: Date,
    dataFine: Date,
    prezzoIniziale: number,
    prezzoAttuale: number,
    utentePrezzoAttuale: number,
    prezzoRiserva: number,
    vincitore: number,
    //funzione per vedere se e stata vinta e quindi non e piu possibile fare nuove offerte e per vedere se il prezzo attuale supera quello di riserva
    checkVittoria: () => boolean,
    //funzione per vedere se e scaduta
    checkTempo: () => boolean,
    //funzione per fare un offerta
    setOfferta: (utente, offerta) => void,
    //funzioni di setter per il moderatore
    setUtente: (utente) => void,
    setLibro: (libro) => void,
    setDataInizio: (dataInizio) => void,
    setDataFine: (dataFine) => void,
    setPrezzoIniziale: (prezzoIniziale) => void,
    setPrezzoAttuale: (prezzoAttuale) => void,
    setPrezzoRiserva: (prezzoRiserva) => void,
    setVincitore: (utente, offerta) => void
}

export function isInserzione(arg: any): arg is Inserzione {
    return arg && arg.idInserzione && typeof (arg.idInserzione) == "number" && arg.utente && typeof (arg.utente) == "number" && arg.libro && typeof (arg.libro) == "number" && arg.dataInizio && arg.dataInizio instanceof Date && arg.dataFine && arg.dataFine instanceof Date && arg.prezzoIniziale && typeof (arg.prezzoIniziale) == "number" && arg.prezzoAttuale && typeof (arg.prezzoAttuale) == "number" && arg.utentePrezzoAttuale && typeof (arg.utentePrezzoAttuale) == "number" && arg.prezzoRiserva && typeof (arg.prezzoRiserva) == "number" && arg.vincitore && typeof (arg.vincitore) == "number";
}

var schemaInserzione = new mongoose.Schema({
    idInserzione: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    utente: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    libro: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    dataInizio: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    dataFine: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    prezzoIniziale: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    prezzoAttuale: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    utentePrezzoAttuale: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    prezzoRiserva: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    vincitore: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
});

schemaInserzione.plugin(autoIncrement.plugin, { model: "Inserzione", field: "idInserzione" });

export function getSchemaInserzione() { return schemaInserzione; }

var modelloInserzione;
export function getModelloInserzione(): mongoose.Model<Inserzione> {
    if (!modelloInserzione) {
        modelloInserzione = mongoose.model("Inserzione", getSchemaInserzione());
    }
    return modelloInserzione;
}

export function newInserzione(data): Inserzione {
    var _modelloInserzione = getModelloInserzione();
    var inserzione = new _modelloInserzione(data);
    return inserzione;
}

//funzione per settare l utente
schemaInserzione.methods.setUtente = function (utente): void {
    this.utente = utente;
}

//funzione per settare il libro
schemaInserzione.methods.setLibro = function (libro): void {
    this.libro = libro;
}

//funzione per settare la data di inizio
schemaInserzione.methods.setDataInizio = function (dataInizio): void {
    this.dataInizio = dataInizio;
}

//funzione per settare la data di fine
schemaInserzione.methods.setDataFine = function (dataFine): void {
    this.dataFine = dataFine;
}

//funzione per settare il prezzo di partenza
schemaInserzione.methods.setPrezzoIniziale = function (prezzoIniziale): void {
    this.prezzoIniziale = prezzoIniziale;
}

//funzione per settare il prezzo attuale
schemaInserzione.methods.setPrezzoAttuale = function (prezzoAttuale): void {
    this.prezzoAttuale = prezzoAttuale;
}

//funzione per settare il prezzo di riserva
schemaInserzione.methods.setPrezzoRiserva = function (prezzoRiserva): void {
    this.prezzoRiserva = prezzoRiserva;
}

//funzione per settare il vincitore con l offerta
schemaInserzione.methods.setVincitore = function (utente, offerta): void {
    this.utentePrezzoAttuale = utente;
    this.prezzoAttuale = offerta;
    this.vincitore = utente;
}

//funzione per vedere se e vinta
schemaInserzione.methods.checkVittoria = function (): boolean {
    //guardo se e scaduta
    if (this.checkTempo()) {
        //guardo se il prezzo di riserva viene superato dal prezzo attuale
        if (this.prezzoRiserva < this.prezzoAttuale) {
            //imposto il vincitore con quello dell ultima offerta
            this.vincitore = this.utentePrezzoAttuale;
            return true;
        }
        //se non e stato superato il prezzo di riserva e il vincitore
        else {
            return false;
        }
    }
    //ce ancora tempo per fare offerta in questa inserzione
    else {
        return false;
    }
}

//funzione per fare una nuova offerta
schemaInserzione.methods.setOfferta = function (utente, offerta): void {
    //guardo se non e scaduta
    if (!this.checkTempo()) {
        //guardo se supera il prezzo attuale
        if (this.prezzoAttuale < offerta) {
            //setto l offerta e il nuovo utente
            this.prezzoAttuale = offerta;
            this.utentePrezzoAttuale = utente;
        }
    }
}

//funzione per vedere se e scaduta
schemaInserzione.methods.checkTempo = function (): boolean {
    //guardo se sono nello stesso anno
    if (this.dataFine.getFullYear() === new Date().getFullYear()) {
        //guardo se sono nello stesso mese
        if (this.dataFine.getMonth() === new Date().getMonth()) {
            //guardo se sono nello stesso giorno
            if (this.dataFine.getDate() === new Date().getDate()) {
                //scade oggi ma ce ancora tempo
                return false;
            }
            //se mancano ancora dei giorni allo scadere
            else if (this.dataFine.getDate() > new Date().getDate()) {
                return false;
            }
        }
        //se mancano ancora dei mesi allo scadere
        else if (this.dataFine.getMonth() > new Date().getMonth()) {
            return false;
        }
    }
    //se mancano ancora degli anni allo scadere
    else if (this.dataFine.getFullYear() > new Date().getFullYear()) {
        return false;
    }
    //se arrivo qua vuol dire che e scaduta
    return true;
}