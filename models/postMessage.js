const mongoose = require('mongoose');

const memoriesPostSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: mongoose.Schema.Types.Mixed,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
const MemoriesPostMessage = mongoose.model('MemoriesPostMessage', memoriesPostSchema)
module.exports = { MemoriesPostMessage };