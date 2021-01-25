import mongoose = require("mongoose");
import autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection("mongodb://localhost:27017/database");
autoIncrement.initialize(connection);

export interface Messaggio extends mongoose.Document {
    idMessaggio: number,
    idInserzione: number,
    messaggioRiferimento: number,
    oggetto: string,
    contenuto: string,
    data: Date,
    mittente: number,
    destinatario: number
}

export function isMessaggio(arg: any): arg is Messaggio {
    return arg  && arg.idMessaggio && typeof (arg.idMessaggio) == "number" && arg.idInserzione && typeof (arg.idInserzione) == "number" && arg.messaggioRiferimento && typeof (arg.messaggioRiferimento) == "number" && arg.oggetto && typeof (arg.oggetto) == "string" && arg.contenuto && typeof (arg.contenuto) == "string" && arg.data && arg.data instanceof Date && arg.mittente && typeof (arg.mittente) == "number" && arg.destinatario && typeof (arg.destinatario) == "number";
}

var schemaMessaggio = new mongoose.Schema({
    idMessaggio: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    idInserzione: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    messaggioRiferimento: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    oggetto: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    contenuto: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    data: {
        type: mongoose.SchemaTypes.Date,
        default: new Date()
    },
    mittente: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    destinatario: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
});

schemaMessaggio.plugin(autoIncrement.plugin, { model: "Messaggio", field: "idMessaggio" });

export function getSchemaMessaggio() { return schemaMessaggio; }

var modelloMessaggio;
export function getModelloMessaggio(): mongoose.Model<Messaggio> {
    if (!modelloMessaggio) {
        modelloMessaggio = mongoose.model("Messaggio", getSchemaMessaggio());
    }
    return modelloMessaggio;
}

export function newMessaggio(data): Messaggio {
    var _modelloMessaggio = getModelloMessaggio();
    var messaggio = new _modelloMessaggio(data);
    return messaggio;
}