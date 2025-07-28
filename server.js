const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // <--- Load .env

const app = express();
const PORT = 5000;

const journalRoutes = require('./routes/journal');

// Middleware
app.use(express.json());

// Connect to MongoDB
console.log("🔍 URI from .env:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get('/', (req, res) => {
  res.send('Mental Health Journal backend is running!');
});

app.use('/api/journal', journalRoutes);

// 📥 GET all journal entries
const JournalEntry = require('./models/JournalEntry'); // ensure this is at the top if not already

app.get('/api/journal', async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ date: -1 }); // latest first
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
