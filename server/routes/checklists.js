const express = require('express');
const router = express.Router();
const checklists = require('../db/checklists.js');
const {checkToken} = require('../controller/auth');

router.get('/api/checklists/:userId',checkToken , async (req, res, next) => {
  try{
    const fetchedChecklist = await checklists.fetchChecklists(req.params.userId, false);
    res.json(fetchedChecklist);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

router.post('/api/checklists/insert', checkToken, async (req, res, next) => {
  try {
    const response = await checklists.insert(req.body, false);
    res.json(response);
  } catch(error) {
    console.log(error);
    res.sendStatus(500).send(error);
  }
})

router.get('/api/usechecklists/checklists/:id', checkToken, async(req, res, next) => {
  try {
    const response = await checklists.getChecklistById(req.params.id, false);
    res.json(response);
  } catch(error) {
    res.sendStatus(500).send(error);
  }
})

router.post('/api/usedChecklists/insert', checkToken, async (req, res, next) => {
  try {
    const response = await checklists.insert(req.body, true);
    res.json(response);
  } catch(error) {
    console.log(error);
    res.sendStatus(500).send(error);
  }
})

router.get('/api/usedChecklists/:userId',checkToken , async (req, res, next) => {
  try{
    const fetchedChecklist = await checklists.fetchChecklists(req.params.userId, true);
    res.json(fetchedChecklist);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

router.get('/api/usechecklists/used-checklists/:id', checkToken, async(req, res, next) => {
  try {
    const response = await checklists.getChecklistById(req.params.id, true);
    res.json(response);
  } catch(error) {
    res.sendStatus(500).send(error);
  }
})

module.exports = router;