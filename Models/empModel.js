const mongoose = require('mongoose');
const moment = require('moment');

const empSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isAdmin: { type: Boolean, default: false },
    isDisable: { type: Boolean, default: false },
    createdAt: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }
});

module.exports = mongoose.model('Employee', empSchema);
