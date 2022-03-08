const { chats } = require('./data/data');
const express = require('express');
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000
dotenv.config({ path: "./../.env" });
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./Middleware/error');

connectDB();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get("/", (req, res) => {
    res.send("API is working");
})

app.get("/api/chat", (req, res) => {
    res.send(chats);
})

app.get("/api/chat/:id", (req, res) => {
    // console.log(req.params.id)
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat)
})

app.use('/api/user', require('./routes/user'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`));