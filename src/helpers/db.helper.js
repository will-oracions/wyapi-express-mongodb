const mongoose = require("mongoose");
const AppConfig = require('../config/app.config');
const logger = require('./logger.helper');
const { MESSAGES } = require('../config/constants.config');

const DB_URI = AppConfig.MONGO_URI;

const connectToMongoDB = async () => {
    logger.info(MESSAGES.DB_ATTEMPT_TO_CONNECT);
    mongoose
      .set('strictQuery', false)
      .connect(
          DB_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },
          (err) => {
            if (err) throw err;
            logger.info(MESSAGES.DB_CONNECTED);
          }
      );
}

module.exports = { connectToMongoDB };