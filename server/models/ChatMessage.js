const mongoose = require('mongoose')

const ChatMessageSchema = new mongoose.Schema({
    message: { type: String },
    user: { 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' 
    },
    date_created: { type: Date, default: Date.now },
})


module.exports = mongoose.model('ChatMessage', ChatMessageSchema)