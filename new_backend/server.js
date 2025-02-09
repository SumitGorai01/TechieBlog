const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventsdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Schemas
const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    location: String,
    eligibility: String,
    description: String
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/events', async (req, res) => {
    const newEvent = new Event(req.body);
    try {
        await newEvent.save();
        res.status(201).json({ message: 'Event saved successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        // Save to database
        const newContact = new Contact(req.body);
        await newContact.save();

        // Send email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'support@techieblog.com',
            subject: 'New Contact Form Submission',
            html: `
                <h3>New Message from Contact Form</h3>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Message:</strong></p>
                <p>${req.body.message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            error: error.response?.data?.error || 'Failed to send message' 
        });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
