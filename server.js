const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 3000;
io.on("connection", (socket) => {
  socket.emit("message", "hello !!");
  socket.broadcast.emit("message", "a user joined");

  socket.on("chatMessage", (msg) => {
    socket.emit("message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("message", "a user disconnected");
  });
});
app.use(express.static("public"));

server.listen(port, () => {
  console.log("app running on port" + port);
});
