"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
module.exports = function () {
    //connessione mongoose
    return mongoose.connect("mongodb://localhost:27017/database");
};
//# sourceMappingURL=mongooseServer.js.map