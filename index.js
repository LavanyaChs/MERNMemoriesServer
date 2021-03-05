const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const postRoutes = require('./routes/posts.js')
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use('/posts', postRoutes);
app.get('/', (req, res) => {
    res.send('Hello! This is Memories API.')
})
// const CONNECTION_URL = `mongodb+srv://lavanyachs:atlas0lavanyachs@cluster0.c7gfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Memories-app server is running on port ${PORT}`))
    })
    .catch((error) => {
        console.log(error);
    })
mongoose.set('useFindAndModify', false);
