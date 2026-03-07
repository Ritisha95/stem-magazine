// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to The Centrifuge backend!');
});

// Handle article submissions
app.post('/submit', (req, res) => {
    const submission = req.body;
    console.log('New Submission:', submission);
    // TODO: Save submission to a database
    res.status(200).json({ message: 'Submission received!', data: submission });
});

// Handle newsletter subscriptions
app.post('/subscribe', (req, res) => {
    const subscriber = req.body;
    console.log('New Subscriber:', subscriber);
    // TODO: Save subscriber to a database
    res.status(200).json({ message: 'Subscription received!', data: subscriber });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
