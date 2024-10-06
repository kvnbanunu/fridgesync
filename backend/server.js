// Dependencies
require('dotenv').config();  // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); // Sessions middleware
const bcrypt = require('bcryptjs'); // For password hashing
const cors = require('cors');
const OAuth = require('oauth');
const request = require('request');

const app = express();

// Modules
const openai = require('./openai');
const db = require('./database');
const userModel = require('./models/userModel')

const PORT = process.env.PORT;
const SESSION_SECRET = process.env.NODE_SESSION_SECRET;

//OAuth 2.0
const FS_CLIENTID = process.env.FAT_SECRET_CLIENTID;
const FS_CLIENT_SECRET = process.env.FAT_SECRET_CLIENT_SECRET;

//OAuth 1.0
const FS_KEY = process.env.FAT_SECRET_CONSUMER_KEY;
const FS_SECRET = process.env.FAT_SECRET_CONSUMER_SECRET;
const oauth = new OAuth.OAuth(null, null, FS_KEY, FS_SECRET, '1.0', null, 'HMAC-SHA1');

app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));

// Auth middleware
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized'});
    }
}

// Basic prompt function
const generateText = async (prompt) => {
    try {
        const response = await openai.completions.create({
            model: 'gpt-4o',
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7, // Creativity level (0-1)
        });
        // TODO: Change this
        console.log('Generated Text:', response.choices[0].text.trim());
    } catch (error) {
        console.error('Error with OpenAI API:', error);
    }
};

// Example for searching food USAGE: searchFood('apple')
const searchFood = (searchTerm) => {
    const url = `https://platform.fatsecret.com/rest/server.api?method=foods.search&format=json&search_expression=${encodeURIComponent(searchTerm)}`;
    oauth.get(url, null, null, (err, data, response) => {
        if (err) {
            console.error('Error: ', err);
        } else {
            // Change to return I guess
            console.log('Response: ', JSON.parse(data));
        }
    });
};

// Routes go here

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    userModel.addUser(username, hashedPassword, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to sign up user' });
        } else {
            res.json({ message: 'User signed up successfully', userId: result.id });
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    userModel.getUserByUsername(username, async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Authentication failed'});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.userId = user.id;
        res.json({ message: 'Login successful' });
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out'});
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
