const express = require('express');
const router = express.Router();
const checklists = require('../db/checklists.js');
const {checkToken} = require('../controller/auth');

router.get('/api/checklists/:userId',checkToken , async (req, res, next) => {
  try{
    const fetchedChecklist = await checklists.getChecklistsByUserId(req.params.userId);
    res.send(fetchedChecklist);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

router.post('/api/checklists/insert', checkToken, async (req, res, next) => {
  try {
    const response = await checklists.insert(req.body);
    res.send(response);
  } catch(error) {
    console.log(error);
    res.sendStatus(500).send(error);
  }
})

module.exports = router;