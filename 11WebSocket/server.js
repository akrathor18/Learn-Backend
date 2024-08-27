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

    socket.on("chat message", (message) => {
        console.log("Message received:", message);
        io.emit("chat message", message); // Broadcasts the message to all connected clients
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

server.listen(port, () => console.log(`Server started at PORT: ${port}`));
