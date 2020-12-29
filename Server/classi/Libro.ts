import mongoose = require("mongoose");
import autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection("mongodb://localhost:27017/database");
autoIncrement.initialize(connection);

export interface Libro extends mongoose.Document {
    idLibro: number,
    nome: string,
    corsoDiStudi: string,
    universita: string,
    autore: string,
    annoPubblicazione: number,
    edizione: number,
    isbn: string
}

export function isLibro(arg: any): arg is Libro {
    return arg && arg.idLibro && typeof (arg.idLibro) == "number" && arg.universita && typeof (arg.universita) == "string" && arg.corsoDiStudi && typeof (arg.corsoDiStudi) == "string" && arg.nome && typeof (arg.nome) == "string" && arg.autore && typeof (arg.autore) == "string" && arg.annoPubblicazione && typeof (arg.annoPubblicazione) == "number" && arg.edizione && typeof (arg.edizione) == "number" && arg.isbn && typeof (arg.isbn) == "string";
}

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

export function getSchemaLibro() { return schemaLibro; }

var modelloLibro;
export function getModelloLibro(): mongoose.Model<Libro> {
    if (!modelloLibro) {
        modelloLibro = mongoose.model("Libro", getSchemaLibro());
    }
    return modelloLibro;
}

export function newLibro(data): Libro {
    var _modelloLibro = getModelloLibro();
    var libro = new _modelloLibro(data);
    return libro;
}