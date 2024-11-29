const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
app.use(express.json());


// Middleware to verify token and roles
const authorize = (roles) => async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secret');
        const response = await axios.get(`http://localhost:3001/permissions/${decoded.userId}`);
        if (!roles.includes(response.data.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
};

// Protected Route
app.get('/admin', authorize(['Admin']), (req, res) => {
    res.send('Welcome Admin');
});

app.get('/user', authorize(['User', 'Admin']), (req, res) => {
    res.send('Welcome User');
});

// Start Server
app.listen(3002, () => console.log('Resource service running on port 3002'));
