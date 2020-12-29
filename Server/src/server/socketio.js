module.exports = function (ios, io, server) {
    ios = io(server);
    ios.on("connection", (client) => {
        console.log("Client socket.io connesso".green);
    });
    ios.on("disconnect", (client) => {
        console.log("Client socket.io sconnesso".blue);
    });
};
//# sourceMappingURL=socketio.js.map