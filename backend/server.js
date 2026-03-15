require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const agentRoutes = require('./routes/agents');
const runRoutes = require('./routes/runs');
const channelRoutes = require('./routes/channels');
const marketplaceRoutes = require('./routes/marketplace');
const errorMiddleware = require('./middleware/error');
const { reloadAllJobs } = require('./services/scheduler');

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/runs', runRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/marketplace', marketplaceRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await reloadAllJobs();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
