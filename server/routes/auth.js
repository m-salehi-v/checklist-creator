const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const auth = require('../db/auth.js');
const config = require('../config');
const {checkToken} = require('../controller/auth');

const tokenGenerator = (id, userName) =>
    jwt.sign({ id, userName }, config.jwt_secret_key, {
        expiresIn: config.jwt_expires_in
    });


router.post('/api/signup', async (req, res, next) => {
    try {
        const result = await auth.signup(req.body);
        const token = tokenGenerator(result.insertId, result.userName);
        res.cookie('authcookie', token,  config.cookieOptions);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400).send(err);
    }
});

router.post('/api/signin', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await auth.login({ email, password });
        const token = tokenGenerator(result.id, result.name);
        res.cookie('authcookie', token, config.cookieOptions);
        res.json({id:result.id, userName: result.name });
    } catch (err) {
        console.log(err)
        res.sendStatus(400).send(err);
    }
});

router.get('/api/autologin', checkToken, async (req, res, next) => {
    const userId = req.userId;
    const name = req.userName;
    res.json({id: userId, name});
})

router.get('/api/logout', async (req, res, next) => {
    res.clearCookie('authcookie');
    res.json('logged out');
})


module.exports = router;