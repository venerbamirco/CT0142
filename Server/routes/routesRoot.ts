
module.exports = function (app) {

    //endpoint root
    app.get("/", (req, res, next) => {
        console.log("ENDPOINT GET /".yellow);
        console.log("FINE ENDPOINT GET /".blue);
        //restituisco la lista di endpoint disponibili
        return res.status(200).json({ api_version: "1.0", endpoints: ["/", "/studenti", "/moderatori", "/inserzioni", "/libri", "/persone", "/statistiche", "/messaggi", "/login"] });
    });

}

