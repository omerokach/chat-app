const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const port = process.env.PORT || 3001;
const socketIo = require("socket.io");
app.use(cors());
let server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());

io.on("connection", (socket) => {
  console.log('user connected!');
  socket.on("join", ({ name, room }, callBack) => {

    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callBack(error);
    console.log(user, 'user joined!');
    socket.emit("messege", {
      user: "admin",
      text: `${user.name}, well come to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("messege", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);

    callBack();
  });

  socket.on("sendmessege", (messege, callBack) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("messege", { user: user.name, text: messege });

    callBack();
  });

  socket.on("disconnect", () => {
    console.log("user had left!!!");
  });
});

app.get("/", (req, res) => {
  res.status(201).send("app is connected and running!");
});

server.listen(port, () => {
  console.log(`app in listening to port ${port}`);
});
