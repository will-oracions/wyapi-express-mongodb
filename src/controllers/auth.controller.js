const bcrypt = require("bcrypt");
const Router = require('express').Router();
// const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const ENDPOINTS = require('../config/appUrl.config');
// const Reservation = require("../models/reservation");
// const SendmailTransport = require("nodemailer/lib/sendmail-transport");
// const sendMail = require("./sendMail");
// const otpGenerator = require('otp-generator');
// const userOtpVerification = require("../models/userOtpVerification");

// const CLIENT_URL = process.env.CLIENT_URL;
// const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });


Router.post(ENDPOINTS.REGISTER, async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password || !phone)
        return res
          .status(400)
          .json({ msg: "veuilez remplir toutes les case " });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "l'email saisi n'est pas valide" });

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "cet email est est déjà pris " });

      if (password.length < 6)
        return res
          .status(400)
          .json({
            msg: "le mot de passe doit contenir au moins 6 charactères",
          });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
        phone,
      };

      const activation_token = createActivationToken(newUser);
      const url = `http://localhost:3000/user/activate/${activation_token}`
     
      // sendMail(
      //   email,
      //   `http://localhost:3000/user/activate/${activation_token}`, // add the link of the app 
      //   `FINALISER L'INSCRIPTION`,
      //   " Work Et Yamo est un cadre de travail spacieux , aéré et climatisé a la portée de toutes les bourses , mettant ainsi à votre disposition plus de <b>6500</b> cours en ligne grace à notre connexion fibre optique"
      // );

    //   console.log({ activation_token });

      res.json({ "activation_token": activation_token});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
});

module.exports = Router;