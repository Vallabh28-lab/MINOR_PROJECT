const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/cases', require('./src/routes/cases'));
app.use('/api/lawyers', require('./src/routes/lawyers'));
app.use('/api/appointments', require('./src/routes/appointments'));
app.use('/api/documents', require('./src/routes/documents'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Legal Dashboard API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
