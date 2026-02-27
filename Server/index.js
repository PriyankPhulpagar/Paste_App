const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const pasteRoutes = require('./routes/pasteRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

connectDB();

app.use('/api', pasteRoutes);

app.get('/', (req, res) => {
  res.send('Paste API Running...');
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});