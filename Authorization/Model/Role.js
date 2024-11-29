const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true },
});

module.exports = mongoose.model('Role', roleSchema);
