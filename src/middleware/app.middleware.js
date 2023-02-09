const { MESSAGES } = require('../config/constants.config');

const errorHandler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: MESSAGES.SERVER_ERROR });
    }

    next();
}

module.exports = { errorHandler };