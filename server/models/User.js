const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    date_created: { type: Date, default: Date.now },
    date_active: { type: Date, default: Date.now },
})


module.exports = mongoose.model('User', UserSchema)