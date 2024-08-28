const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log("A user connected with ID:", socket.id);
  socket.on("chat message", (message) => {
    console.log(`Message from ${socket.id}:`, message);
    io.emit("chat message", `${socket.id}: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`User with ID ${socket.id} disconnected`);
  });
});
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });

  socket.on("user-typing", (typingStatus) => {
    console.log(`User is typing: ${typingStatus}`);
    // You could broadcast this status to other clients if needed
  });
});

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });

  socket.on("user-typing", (isTyping) => {
    socket.broadcast.emit("notifyTyping", { user: socket.id, isTyping: isTyping });
  });
});


let users = {}; // Object to store users and their socket IDs

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // When a user logs in or connects, save their ID with their username
    socket.on('register', (username) => {
        users[username] = socket.id;
        console.log(`User registered: ${username} with ID: ${socket.id}`);
    });

    // Sending a message to a specific user
    socket.on('private-message', ({ recipient, message }) => {
        const recipientSocketId = users[recipient];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('private-message', { sender: socket.id, message: message });
        } else {
            console.log(`User ${recipient} not found`);
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        // Remove the user from the list when they disconnect
        for (let username in users) {
            if (users[username] === socket.id) {
                delete users[username];
                console.log(`User disconnected: ${username}`);
                break;
            }
        }
    });
});


app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

server.listen(port, () => console.log(`Server started at PORT: ${port}`));
