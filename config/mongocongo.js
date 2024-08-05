const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let db;

// Connect to MongoDB
const mongoConnectDB = async () => {
  try {
    await client.connect();
    db = client.db('task-manager'); // Set the database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

// Function to get the database instance
const mongoGet = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { mongoConnectDB, mongoGet };
