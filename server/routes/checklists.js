const express = require('express');
const router = express.Router();
const checklists = require('../db/checklists.js');

router.get('/api/checklists/:userId', async (req, res, next) => {
  const fetchedChecklist = await checklists.getChecklistsByUserId(req.params.userId);
  res.json(fetchedChecklist);
});

module.exports = router;