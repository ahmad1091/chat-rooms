const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = 3000;
io.on("connection", (socket) => {
  console.log("connected");
});
app.use(express.static("public"));

server.listen(port, () => {
  console.log("app running on port" + port);
});
