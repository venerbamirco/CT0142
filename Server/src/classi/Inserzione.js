"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newInserzione = exports.getModelloInserzione = exports.getSchemaInserzione = exports.isInserzione = void 0;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost:27017/database");
autoIncrement.initialize(connection);
function isInserzione(arg) {
    return arg && arg.idInserzione && typeof (arg.idInserzione) == "number" && arg.utente && typeof (arg.utente) == "number" && arg.libro && typeof (arg.libro) == "number" && arg.dataInizio && arg.dataInizio instanceof Date && arg.dataFine && arg.dataFine instanceof Date && arg.prezzoIniziale && typeof (arg.prezzoIniziale) == "number" && arg.prezzoAttuale && typeof (arg.prezzoAttuale) == "number" && arg.utentePrezzoAttuale && typeof (arg.utentePrezzoAttuale) == "number" && arg.prezzoRiserva && typeof (arg.prezzoRiserva) == "number" && arg.vincitore && typeof (arg.vincitore) == "number";
}
exports.isInserzione = isInserzione;
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
function getSchemaInserzione() { return schemaInserzione; }
exports.getSchemaInserzione = getSchemaInserzione;
var modelloInserzione;
function getModelloInserzione() {
    if (!modelloInserzione) {
        modelloInserzione = mongoose.model("Inserzione", getSchemaInserzione());
    }
    return modelloInserzione;
}
exports.getModelloInserzione = getModelloInserzione;
function newInserzione(data) {
    var _modelloInserzione = getModelloInserzione();
    var inserzione = new _modelloInserzione(data);
    return inserzione;
}
exports.newInserzione = newInserzione;
//funzione per settare l utente
schemaInserzione.methods.setUtente = function (utente) {
    this.utente = utente;
};
//funzione per settare il libro
schemaInserzione.methods.setLibro = function (libro) {
    this.libro = libro;
};
//funzione per settare la data di inizio
schemaInserzione.methods.setDataInizio = function (dataInizio) {
    this.dataInizio = dataInizio;
};
//funzione per settare la data di fine
schemaInserzione.methods.setDataFine = function (dataFine) {
    this.dataFine = dataFine;
};
//funzione per settare il prezzo di partenza
schemaInserzione.methods.setPrezzoIniziale = function (prezzoIniziale) {
    this.prezzoIniziale = prezzoIniziale;
};
//funzione per settare il prezzo attuale
schemaInserzione.methods.setPrezzoAttuale = function (prezzoAttuale) {
    this.prezzoAttuale = prezzoAttuale;
};
//funzione per settare il prezzo di riserva
schemaInserzione.methods.setPrezzoRiserva = function (prezzoRiserva) {
    this.prezzoRiserva = prezzoRiserva;
};
//funzione per settare il vincitore con l offerta
schemaInserzione.methods.setVincitore = function (utente, offerta) {
    this.utentePrezzoAttuale = utente;
    this.prezzoAttuale = offerta;
    this.vincitore = utente;
};
//funzione per vedere se e vinta
schemaInserzione.methods.checkVittoria = function () {
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
};
//funzione per fare una nuova offerta
schemaInserzione.methods.setOfferta = function (utente, offerta) {
    //guardo se non e scaduta
    if (!this.checkTempo()) {
        //guardo se supera il prezzo attuale
        if (this.prezzoAttuale < offerta) {
            //setto l offerta e il nuovo utente
            this.prezzoAttuale = offerta;
            this.utentePrezzoAttuale = utente;
        }
    }
};
//funzione per vedere se e scaduta
schemaInserzione.methods.checkTempo = function () {
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
};
//# sourceMappingURL=Inserzione.js.map