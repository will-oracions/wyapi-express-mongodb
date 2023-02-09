const AppConfig = require('./app.config');

const MESSAGES = {
    SERVER_LISTENING: `le serveur tourne sur le port ${AppConfig.PORT}`,
    SERVER_ERROR: 'Something is wrong. please try later',
    DB_ATTEMPT_TO_CONNECT: `Attempt to connect to Database. URI: ${AppConfig.DB_URI}`,
    DB_CONNECTED: "connecté a mongo db",
}

module.exports = { MESSAGES };