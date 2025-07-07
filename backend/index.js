const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Load env variables
dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use("/api", require('./routes/indexRoute'))

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
