module.exports = function (app, https, fs) {
    //connessione con https
    https.createServer({
        key: fs.readFileSync("./keys/key.pem"),
        cert: fs.readFileSync("keys/cert.pem")
    }, app).listen(8443);
};
//# sourceMappingURL=httpsServer.js.map