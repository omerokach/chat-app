import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messege, setmessege] = useState("");
  const [messeges, setMesseges] = useState([]);
  const END_POINT = "localhost:3001";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    const socket = io(END_POINT, {
      withCredentials: true,
    });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [END_POINT, Location.search]);

  useEffect(() => {
    const socket = io(END_POINT, {
      withCredentials: true,
    });
    socket.on("messege", (messege) => {
      console.log(messege);
      setMesseges([...messeges, messege]);
    });
  }, [messeges]);

  //function for sending messeges
  const sendmessege = (event) => {
    event.preventDefault();
        const socket = io(END_POINT, {
      withCredentials: true,
    });
    if (messege) {
      socket.emit("sendmessege", messege, () => setmessege(""));
    }
  };
  console.log(messege);
  console.log(messeges);
  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={messege}
          onChange={(event) => setmessege(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendmessege(event) : null
          }
        />
      </div>
    </div>
  );
}

export default Chat;
