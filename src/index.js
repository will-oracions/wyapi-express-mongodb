require("dotenv").config();
const app = require('./app');
const logger = require('./helpers/logger.helper');
const AppConfig = require('./config/app.config');
const DbHelpers = require('./helpers/db.helper');
const { MESSAGES } = require('./config/constants.config');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = AppConfig.PORT;

DbHelpers.connectToMongoDB();

app.listen(PORT, () =>logger.info(MESSAGES.SERVER_LISTENING, PORT));
