// server.js

const express = require('express');
const { mongoConnectDB } = require('./config/mongocongo');
const todoRoutes = require('./routes/todoRoute');
const projectRoutes = require('./routes/projectRoute');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoConnectDB();

// Define Routes
app.use('/api/todos', todoRoutes);
app.use('/api/projects', projectRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
