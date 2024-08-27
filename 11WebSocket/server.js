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

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

server.listen(port, () => console.log(`Server started at PORT: ${port}`));
