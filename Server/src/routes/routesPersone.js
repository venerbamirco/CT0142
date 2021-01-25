"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import delle classi usate
const user = require("./../classi/User");
module.exports = function (app) {
    //endpoint per estrarmi tutti gli utenti non catalogandoli per studenti o moderatori
    app.get("/persone", (req, res, next) => {
        //estraggo tutti gli utenti dal databse
        user.getModelloUser().find({}).then((users) => {
            console.log("ENDPOINT GET /persone".yellow);
            return res.status(200).json({ statusCode: 200, endpoint: "/persone", method: "get", error: false, message: "Persone estratte", reasons: null, utenti: users });
        }).catch((errore) => {
            //errore nella estrazione degli utenti
            console.log(("FINE ENDPOINT GET /persone " + errore).red);
            return res.status(501).json({ statusCode: 501, endpoint: "/persone", method: "get", error: true, message: "Errore estrazioni persone", reasons: errore });
        });
    });
};
//# sourceMappingURL=routesPersone.js.map