const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'angry', 'neutral'],
    default: 'neutral'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
