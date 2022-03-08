const { chats } = require('./data/data');
const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
const PORT = process.env.PORT || 3000
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

app.use('/api/user', require('./Routes/user'));
app.use('/api/chat', require('./Routes/chat'));
app.use("/api/message", require("./Routes/message"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});