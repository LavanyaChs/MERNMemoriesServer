const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    if: { type: String }
})
const MemoriesUsers = mongoose.model('MemoriesUserSchema', userSchema);
module.exports = { MemoriesUsers }