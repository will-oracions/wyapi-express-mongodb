const Router = require('express').Router();
const ENDPOINTS = require('../config/appUrl.config');
const AuthController = require('../controllers/auth.controller');

Router.post(ENDPOINTS.REGISTER, AuthController.register);
Router.login(ENDPOINTS.LOGIN, AuthController.login);
Router.post(ENDPOINTS.VERIFY_EMAIL_ADDRESS, AuthController.verifyEmailAddress);
Router.post(ENDPOINTS.PASSWORD_FORGOT, AuthController.passwordForgot);
Router.get(ENDPOINTS.RESET_PASSWORD, AuthController.resetPassword);
Router.patch(ENDPOINTS.UPDATE_USER_ROLE, AuthController.updateUserRole);
Router.patch(ENDPOINTS.SET_AMBASSADOR, AuthController.setUserAsAbassador);
Router.delete(ENDPOINTS.CLOSE_ACCOUNT, AuthController.closeAccount);

module.exports = Router;