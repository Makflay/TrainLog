require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

//routes
app.get('/', (req, res) => {
  res.send('TrainLog server is running!');
});
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});