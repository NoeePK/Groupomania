require("dotenv").config();
const http = require("http");
const app = require("./app");

const normalizePort = require("./middlewares/verifyPort");
const errorHandler = require("./middlewares/errorHandler");

const port = normalizePort(process.env.PORT || 3500);
app.set("port", port);

const server = http.createServer(app);

// Lancement du serveur
server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Serveur démarré sur le " + bind);
    console.log(`Ouvrir dans le navigateur : http://localhost:${port}`);
});

server.listen(port);
