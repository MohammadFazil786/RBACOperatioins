const express = require('express');
const mongoose = require('mongoose');
const Role = require('./models/Role');

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

// Create Role
app.post('/roles', async (req, res) => {
    const { userId, role } = req.body;
    const newRole = new Role({ userId, role });
    await newRole.save();
    res.status(201).send('Role assigned');
});

// Get Role Permissions
app.get('/permissions/:userId', async (req, res) => {
    const { userId } = req.params;
    const role = await Role.findOne({ userId });
    if (!role) return res.status(404).send('Role not found');
    res.json({ role: role.role });
});

// Start Server
app.listen(3001, () => console.log('Authorization service running on port 3001'));
