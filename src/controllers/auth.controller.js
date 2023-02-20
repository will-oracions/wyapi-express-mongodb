const bcrypt = require("bcrypt");
const User = require('../models/user.model');

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
  
      if (!user)
        return res.status(400).json({ msg: "cet email n'existe pas  " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "le mot de passe entrer est incorrect " });
  
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // valable 7jours
      });
  
      res.json({"access_token" : refresh_token});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
};

export const verifyEmailAddress = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) res.status(400).json({ msg: "veuillez vous connecter" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) res.status(400).json({ msg: "veuillez vous connecter" });

      const access_token = createAccessToken({ id: user.id });
    res.json(access_token);
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const passwordForgot = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "cet email email est invalide" });

    const access_token = createAccessToken({ id: user._id });
    const url = `${CLIENT_URL}/user/reset/${access_token}`;

    sendMail(email, url, "CHANGER LE MOT DE PASSE");
    res.json({
      msg: "veuillez verifier votre boite mail pour changer votre mot de passe",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(password);
    const passwordHash = await bcrypt.hash(password, 12);

    res.json({ msg: "le mot de passe a été reinitialiser avec succès" });

    console.log(req.user);

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("refreshtoken", { path: "user/refresh_token" });

//     return res.json({ msg: "deconnexion reussie" });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    await Users.findByIdAndUpdate(
      { _id: req.params.user.id },
      {
        role : role,
      }
    );

    res.json({ msg: "modifier avec succès" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const setUserAsAbassador = async (req, res) => {
  try {
    const { ambassador } = req.body;
    await Users.findByIdAndUpdate(
      { _id: req.user.id },
      {
        ambassador,
      }
    );

    res.json({ msg: "Vous etes désormais ambassadeur" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const closeAccount = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);

    res.json({ msg: "Compte supprimé avec succès" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};