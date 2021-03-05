const mongoose = require('mongoose');

const memoriesPostSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: mongoose.Schema.Types.Mixed,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
const MemoriesPostMessage = mongoose.model('MemoriesPostMessage', memoriesPostSchema)
module.exports = { MemoriesPostMessage };