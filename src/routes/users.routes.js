const Router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require('../models/user.model');
const ENDPOINTS = require('../config/appUrl.config');
const UsersController = require('../controllers/users.controller');

Router.get(ENDPOINTS.FIND_USER_BY_ID, UsersController.findById);
Router.get(ENDPOINTS.FIND_ADMIN_USERS, UsersController.findAll);
Router.put(ENDPOINTS.UPDATE_USER, UsersController.updateUser);
Router.get(ENDPOINTS.FIND_ADMIN_USERS, UsersController.findAdmins);