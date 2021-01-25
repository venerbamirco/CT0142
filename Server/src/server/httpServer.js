"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const io = require("socket.io");
module.exports = function (app) {
    /*
    //connessione con https
    https.createServer({
        key: fs.readFileSync("./keys/key.pem"),
        cert: fs.readFileSync("keys/cert.pem")
    }, app).listen(8443);
    */
    //connessione http
    var server = http.createServer(app);
    server.listen(8080, () => console.log("Connesso via http".green));
    //configurazione socket io
    var ios = io(server);
    ios.on("connection", (client) => {
        console.log("Client socket.io connesso".green);
    });
    ios.on("disconnect", (client) => {
        console.log("Client socket.io sconnesso".blue);
    });
    return ios;
};
//# sourceMappingURL=httpServer.js.map