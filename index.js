const express = require("express");
const app = express();
const http = require("http");
const port = process.env.PORT || 3001;
const socketIo = require("socket.io");

app.use(express.json());
let server = http.createServer(app);
let io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A new user just connected");
});
console.log();

server.listen(port, () => {
  console.log(`app in listening to port ${port}`);
});
