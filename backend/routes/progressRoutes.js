const express = require('express');
const router = express.Router();
const Progress = require('../models/progress');

// POST - Add new entry
router.post('/', async (req, res) => {
  try {
    const { userId, weight, date } = req.body;
    const newEntry = new Progress({ userId, weight, date });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Fetch entries by user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const entries = await Progress.find({ userId }).sort({ date: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;