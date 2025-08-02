const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const pasteRoutes = require('./routes/pasteRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Enable CORS for your frontend (port 3001)
app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true,
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Set Content Security Policy headers
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "connect-src 'self' http://localhost:3001; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
    "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;"
  );
  next();
});

// ✅ Connect to MongoDB
connectDB();

// ✅ API Routes
app.use('/api', pasteRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Paste app listening on port ${PORT}`);
});
