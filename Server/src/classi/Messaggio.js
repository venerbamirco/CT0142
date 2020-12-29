"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessaggio = exports.getModelloMessaggio = exports.getSchemaMessaggio = exports.isMessaggio = void 0;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost:27017/database");
autoIncrement.initialize(connection);
function isMessaggio(arg) {
    return arg && arg.idMessaggio && typeof (arg.idMessaggio) == "number" && arg.idInserzione && typeof (arg.idInserzione) == "number" && arg.messaggioRiferimento && typeof (arg.messaggioRiferimento) == "number" && arg.oggetto && typeof (arg.oggetto) == "string" && arg.contenuto && typeof (arg.contenuto) == "string" && arg.data && arg.data instanceof Date && arg.mittente && typeof (arg.mittente) == "number" && arg.destinatario && typeof (arg.destinatario) == "number";
}
exports.isMessaggio = isMessaggio;
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
function getSchemaMessaggio() { return schemaMessaggio; }
exports.getSchemaMessaggio = getSchemaMessaggio;
var modelloMessaggio;
function getModelloMessaggio() {
    if (!modelloMessaggio) {
        modelloMessaggio = mongoose.model("Messaggio", getSchemaMessaggio());
    }
    return modelloMessaggio;
}
exports.getModelloMessaggio = getModelloMessaggio;
function newMessaggio(data) {
    var _modelloMessaggio = getModelloMessaggio();
    var messaggio = new _modelloMessaggio(data);
    return messaggio;
}
exports.newMessaggio = newMessaggio;
//# sourceMappingURL=Messaggio.js.map