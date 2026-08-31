const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000').split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(cors({
  origin(origin, callback){
    if(!origin || allowedOrigins.includes(origin) || /^https:\/\/[^/]+\.vercel\.app$/.test(origin)){
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS'));
  },
}));
app.use(express.json());

// Health check — useful for confirming Render deploy is alive
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
