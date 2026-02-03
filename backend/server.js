const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./src/routes/auth'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Legal Dashboard API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
