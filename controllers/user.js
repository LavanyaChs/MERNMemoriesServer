const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MemoriesUsers } = require('../models/user');

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await MemoriesUsers.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: `User doesn't exist.` });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid Credentials' })
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}
const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmpassword } = req.body;
    try {
        const existingUser = await MemoriesUsers.findOne({ email });
        if (existingUser) return res.status(400).json({ message: `User already exists.` });
        if (password !== confirmpassword) return res.status(400).json({ message: 'Passwords doesn\'t match' });
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await MemoriesUsers.create({ email, password: hashedPassword, name: `${firstName}, ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
        res.status(200).json({ result: result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}
module.exports = { signin, signup };