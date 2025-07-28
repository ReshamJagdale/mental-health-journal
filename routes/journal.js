const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// POST - create new journal entry
router.post('/', async (req, res) => {
  try {
    const { text, mood } = req.body;
    const entry = new JournalEntry({ text, mood });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: 'Could not save entry' });
  }
});

// GET - get all journal entries
router.get('/', async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch entries' });
  }
});

module.exports = router;
