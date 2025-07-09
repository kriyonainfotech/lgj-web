const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Load env variables
dotenv.config();
connectDB();

app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // to parse JSON

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://mirosajewelry.vercel.app"
    ],
    credentials: true,
};

app.use(cors(corsOptions));

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
