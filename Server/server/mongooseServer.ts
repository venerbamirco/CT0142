import mongoose = require("mongoose")

module.exports = function (): Promise<typeof mongoose> {

    //connessione mongoose
    return mongoose.connect("mongodb://localhost:27017/database");

}