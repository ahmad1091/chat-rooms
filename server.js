const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const formatMessage = require("./utils/messages");

const port = 3000;
io.on("connection", (socket) => {
  socket.emit("message", formatMessage("Admin", "wellcom!!"));
  socket.broadcast.emit("message", formatMessage("Admin", "user joined"));

  socket.on("chatMessage", (msg) => {
    socket.emit("message", formatMessage("user", msg));
  });

  socket.on("disconnect", () => {
    io.emit("message", formatMessage("Admin", "user disconnected"));
  });
});
app.use(express.static("public"));

server.listen(port, () => {
  console.log("app running on port" + port);
});
