const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const auth = require('../db/auth.js');
const config = require('../config');


const checkToken = (req, res, next) => {
    const authcookie = req.cookies.authcookie;
    jwt.verify(authcookie, config.jwt_secret_key, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else if (data.id) {
            req.userId = data.id
            next()
        } else {
            res.sendStatus(403);
        }
    })
}

const tokenGenerator = (id) =>
    jwt.sign({ id }, config.jwt_secret_key, {
        expiresIn: config.jwt_expires_in
    });


router.post('/api/signup', async (req, res, next) => {
    try {
        const result = await auth.signup(req.body);
        const token = tokenGenerator(result.insertId);
        res.cookie('authcookie', token,  config.cookieOptions);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400).send(err);
    }
});

router.post('/api/signin', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await auth.login({ email, password });
        const token = tokenGenerator(result.id);
        res.cookie('authcookie', token, config.cookieOptions);
        console.log(result)
        res.send({id:result.id });
    } catch (err) {
        console.log(err)
        res.sendStatus(400).send(err);
    }
});



module.exports = router;