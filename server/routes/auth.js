const express = require('express');
const router = express.Router();
const auth = require('../db/auth.js');

router.post('/api/signup', async (req, res, next) => {
    try{
        const response = await auth.signup(req.body);
        res.send(response);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;