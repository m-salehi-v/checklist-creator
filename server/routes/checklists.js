const express = require('express');
const router = express.Router();
const checklists = require('../db/checklists.js');

router.get('/api/checklists/:userId', async (req, res, next) => {
  try{
    const fetchedChecklist = await checklists.getChecklistsByUserId(req.params.userId);
    res.send(fetchedChecklist);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

module.exports = router;