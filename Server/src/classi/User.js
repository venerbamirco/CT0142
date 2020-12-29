"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = exports.getModelloUser = exports.getSchemaUser = exports.isUser = void 0;
const mongoose = require("mongoose");
const crypto = require("crypto");
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost:27017/database");
autoIncrement.initialize(connection);
function isUser(arg) {
    return arg && arg.idUser && typeof (arg.idUser) == "number" && Array.isArray(arg.ruolo) && Array.isArray(arg.astePartecipate) && arg.nome && typeof (arg.nome) == "string" && arg.cognome && typeof (arg.cognome) == "string" && arg.areaGeografica && typeof (arg.areaGeografica) == "string" && arg.username && typeof (arg.username) == "string" && arg.email && typeof (arg.email) == "string" && arg.salt && typeof (arg.salt) == "string";
}
exports.isUser = isUser;
var schemaUser = new mongoose.Schema({
    idUser: {
        type: mongoose.SchemaTypes.Number,
        required: false
    },
    ruolo: {
        type: [mongoose.SchemaTypes.String],
        required: true
    },
    nome: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    cognome: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    areaGeografica: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    astePartecipate: {
        type: [mongoose.SchemaTypes.Number],
        required: true
    },
    salt: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    digest: {
        type: mongoose.SchemaTypes.String,
        required: false
    }
});
schemaUser.plugin(autoIncrement.plugin, { model: "User", field: "idUser" });
schemaUser.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(128).toString("hex");
    var hmac = crypto.createHmac("sha512", this.salt);
    hmac.update(password);
    this.digest = hmac.digest("hex");
};
schemaUser.methods.checkPassword = function (password) {
    var hmac = crypto.createHmac("sha512", this.salt);
    hmac.update(password);
    var digest = hmac.digest("hex");
    return (this.digest === digest);
};
schemaUser.methods.hasStudente = function () {
    for (var id in this.ruolo) {
        if (this.ruolo[id] === "Studente")
            return true;
    }
    return false;
};
schemaUser.methods.setStudente = function () {
    if (!this.hasStudente())
        this.ruolo.push("Studente");
};
schemaUser.methods.hasModeratore = function () {
    for (var id in this.ruolo) {
        if (this.ruolo[id] === "Moderatore")
            return true;
    }
    return false;
};
schemaUser.methods.setModeratore = function () {
    if (!this.hasModeratore())
        this.ruolo.push("Moderatore");
};
schemaUser.methods.setAstaPartecipate = function (idInserzione) {
    if (!this.astePartecipate.includes(idInserzione)) {
        this.astePartecipate.push(idInserzione);
    }
};
function getSchemaUser() {
    return schemaUser;
}
exports.getSchemaUser = getSchemaUser;
var modelloUser;
function getModelloUser() {
    if (!modelloUser) {
        modelloUser = mongoose.model("User", getSchemaUser());
    }
    return modelloUser;
}
exports.getModelloUser = getModelloUser;
function newUser(data) {
    var _modelloUser = getModelloUser();
    var user = new _modelloUser(data);
    return user;
}
exports.newUser = newUser;
//# sourceMappingURL=User.js.map