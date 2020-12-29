
module.exports = function (app) {

    //middleware per la gestione degli errori
    app.use((err, req, res, next) => {
        console.log("ENDPOINT USE /errori_generici".yellow);
        console.log("ERRORE RICHIESTA: ".red + JSON.stringify(err));
        console.log(("FINE ENDPOINT USE /errori_generici " + err).red);
        return res.status(501).json({ statusCode: 501, endpoint: "/errori_generici", method: "use", error: true, message: "Errori generici", reasons: err });
    });

    //middleware per endpoint non esistenti
    app.use((req, res, next) => {
        console.log("ENDPOINT USE /endpoint_inesistenti".yellow);
        console.log("FINE ENDPOINT USE /endpoint_inesistenti".red);
        return res.status(501).json({ statusCode: 501, endpoint: "/endpoint_inesistenti", method: "use", error: true, message: "Endpoint inesistente", reasons: null });
    });

}