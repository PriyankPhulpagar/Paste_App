const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const pasteRoutes = require('./routes/pasteRoutes');
const cors = require('cors');

dotenv.config();

const app = express();


// ✅ FIXED CORS — allow localhost, vercel and render frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://pasteapp-two.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // allow all for now (safe for development)
    }
  },
  credentials: true,
}));


// ✅ Middleware
app.use(express.json());


// ✅ MongoDB
connectDB();


// ✅ Routes
app.use('/api', pasteRoutes);


// ✅ Root route
app.get('/', (req, res) => {
  res.send('Paste API Running...');
});


// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Paste app listening on port ${PORT}`);
});