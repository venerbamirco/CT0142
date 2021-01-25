"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newLibro = exports.getModelloLibro = exports.getSchemaLibro = exports.isLibro = void 0;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost:27017/database");
autoIncrement.initialize(connection);
function isLibro(arg) {
    return arg && arg.idLibro && typeof (arg.idLibro) == "number" && arg.universita && typeof (arg.universita) == "string" && arg.corsoDiStudi && typeof (arg.corsoDiStudi) == "string" && arg.nome && typeof (arg.nome) == "string" && arg.autore && typeof (arg.autore) == "string" && arg.annoPubblicazione && typeof (arg.annoPubblicazione) == "number" && arg.edizione && typeof (arg.edizione) == "number" && arg.isbn && typeof (arg.isbn) == "string";
}
exports.isLibro = isLibro;
var schemaLibro = new mongoose.Schema({
    idLibro: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    nome: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    corsoDiStudi: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    universita: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    autore: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    annoPubblicazione: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    edizione: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    isbn: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});
schemaLibro.plugin(autoIncrement.plugin, { model: "Libro", field: "idLibro" });
function getSchemaLibro() { return schemaLibro; }
exports.getSchemaLibro = getSchemaLibro;
var modelloLibro;
function getModelloLibro() {
    if (!modelloLibro) {
        modelloLibro = mongoose.model("Libro", getSchemaLibro());
    }
    return modelloLibro;
}
exports.getModelloLibro = getModelloLibro;
function newLibro(data) {
    var _modelloLibro = getModelloLibro();
    var libro = new _modelloLibro(data);
    return libro;
}
exports.newLibro = newLibro;
//# sourceMappingURL=Libro.js.map