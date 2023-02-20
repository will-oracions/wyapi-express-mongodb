const { MESSAGES } = require('../config/constants.config');

const errorHandler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: MESSAGES.SERVER_ERROR });
    }
    next();
}

const tokenExtractor = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token)return res.status(400).json({msg : "Authentification Invalide"})
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)  return res.status(400).json({msg : "Authentification Invalide"}) 
            req.user = user
            next()
        });
    } catch (err) {
        return res.status(500).json({msg : err.message})
    }
}

const adminGuard = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})
        if(user.role !== 1) return res.status(500).json({ msg: "accès au panel administrateur refusé"})
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message})
    }
}

module.exports = { errorHandler, tokenExtractor, adminGuard };