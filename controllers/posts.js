const mongoose = require('mongoose');
const { MemoriesPostMessage } = require('../models/postMessage.js');

const getPosts = async (req, res) => {
    try {
        console.log("Call to get post!")
        const memoriesPostMessage = await MemoriesPostMessage.find();
        console.log(memoriesPostMessage);
        res.status(200).json(memoriesPostMessage);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error })
    }
}
const createPost = async (req, res) => {
    const post = req.body;
    console.log(post)
    const newMemoryPost = new MemoriesPostMessage(post)
    try {
        await newMemoryPost.save();
        res.status(201).json(newMemoryPost);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    console.log("Is id valid", !mongoose.Types.ObjectId.isValid(_id));
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    const updatedPost = await MemoriesPostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.status(200).json(updatedPost);

}
const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }
    await MemoriesPostMessage.findOneAndDelete(id);
    res.json({ message: 'Post delete successfully' })
}
const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }
    const post = await MemoriesPostMessage.findById(id);
    const updatedPost = await MemoriesPostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
    res.json(updatedPost);
}
module.exports = { getPosts, createPost, updatePost, deletePost, likePost }