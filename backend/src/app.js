const dotenv = require('dotenv');
dotenv.config();
require('module-alias/register');
const express = require('express');
const cors = require('cors');

const app = express();

// Import the user route
const userRoute = require('./routes/user');

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Use the user route
app.use('/api/user', userRoute);

module.exports = app;
