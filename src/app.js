const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const helmet = require('helmet');
const ENDPOINTS = require('./config/appUrl.config');
const middlewares = require('./middleware/app.middleware');
const { MESSAGES } = require('./config/constants.config');

// Routes
const AuthRoutes = require('./routes/auth.routes');
const UsersRoutes = require('./routes/users.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

/* APP ROUTES GO HERE */
app.get('/', (req, res) => res.send(MESSAGES.SERVER_LISTENING));

app.use(ENDPOINTS.AUTH_PREFIX, AuthRoutes);
app.use(ENDPOINTS.USERS_PREFIX, UsersRoutes);

/* APP ROTUES END HERE */
app.use(middlewares.errorHandler);

module.exports = app;