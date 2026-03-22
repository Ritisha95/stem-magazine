const express = require('express');
const { Pool } = require('pg'); // Use pg for Supabase
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// --- DATABASE CONNECTION (SUPABASE) ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

// --- ROUTES ---

// 1. Submit Work
app.post('/api/submit-work', async (req, res) => {
    const { name, email, school, grade, category, title, abstract, message } = req.body;
    try {
        const sql = `INSERT INTO submissions (name, email, school, grade, category, title, abstract, message) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        await pool.query(sql, [name, email, school, grade, category, title, abstract, message]);
        
        sendEmail("New Submission!", `Title: ${title}\nBy: ${name}`);
        res.send("<h1>Success!</h1><p>Your work has been submitted.</p><a href='/'>Return to Home</a>");
    } catch (err) {
        res.status(500).send("Database Error: " + err.message);
    }
});

// 2. Subscribe
app.post('/api/subscribe', async (req, res) => {
    const { name, email, school, interests } = req.body;
    try {
        await pool.query("INSERT INTO subscribers (name, email, school, interests) VALUES ($1, $2, $3, $4)", 
            [name, email, school, interests]);
        sendEmail("New Subscriber", `Email: ${email}`);
        res.send("<h1>Thanks for Subscribing!</h1><a href='/'>Return to Home</a>");
    } catch (err) {
        res.send("You're already on the list!");
    }
});

// 3. Contact
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await pool.query("INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)", 
            [name, email, subject, message]);
        sendEmail(`Contact: ${subject}`, `From: ${name}\n${message}`);
        res.send("<h1>Message Sent!</h1><a href='/'>Return to Home</a>");
    } catch (err) {
        res.status(500).send("Database Error");
    }
});

// Email Helper
function sendEmail(subject, text) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, 
        subject: `CENTRIFUGE ALERT: ${subject}`,
        text: text
    };
    transporter.sendMail(mailOptions);
}

// CRITICAL FOR VERCEL: Export the app instead of app.listen()
module.exports = app;
