
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const app = express();

app.use(cors());
app.use(express.json());




app.use('/api/auth', authRoutes);



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
