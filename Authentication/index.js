const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('').
then((res) =>{
    console.log('DB connected!');
}).
catch((err) =>{
    console.log(err);
});

// Register Endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

// Start Server
app.listen(3000, () => console.log('Auth service running on port 3000'));
