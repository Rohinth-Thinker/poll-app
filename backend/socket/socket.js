
const { Server } = require("socket.io");
const express = require("express");
const { createServer } = require("http");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: "http://localhost:5173",
});

io.on("connection", (socket) => {
    
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
    })

    socket.on('leave_room', (roomId) => {
        socket.leave(roomId);
    })

})


module.exports = { app, server, io };