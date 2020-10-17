const jwt = require('jsonwebtoken');

const config = require('../config');

exports.checkToken = (req, res, next) => {
    const authcookie = req.cookies.authcookie;
    jwt.verify(authcookie, config.jwt_secret_key, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else if (data.id) {
            req.userId = data.id;
            req.userName = data.userName;
            next()
        } else {
            res.sendStatus(403);
        }
    })
}