const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const port = 3000;
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit("message", formatMessage("Admin", "wellcom!!"));
    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage("Admin", user.username + " joined"));
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", formatMessage(user.username, msg));
    }
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("Admin", user.username + " left")
      );
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(room),
      });
    }
  });
});
app.use(express.static("public"));

server.listen(port, () => {
  console.log("app running on port" + port);
});
