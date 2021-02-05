const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser } = require("./utils/users");

const port = 3000;
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit("message", formatMessage("Admin", "wellcom!!"));
    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage("Admin", user.username + " joined"));
  });

  socket.on("chatMessage", (msg) => {
    socket.emit("message", formatMessage(username, msg));
  });

  socket.on("disconnect", () => {
    io.emit("message", formatMessage("Admin", "user disconnected"));
  });
});
app.use(express.static("public"));

server.listen(port, () => {
  console.log("app running on port" + port);
});
