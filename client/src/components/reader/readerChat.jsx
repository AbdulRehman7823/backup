
import React from "react";
import "./chatStyle.css";
import { useState, useEffect } from "react";
import ReaderChatView from "./ReaderChatView";
import { useLocation } from "react-router-dom";
import authServices from "../Services/AuthServices";

import socket from "../../sockets";

function ReaderChat() {
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [poet, setPoet] = useState(location.state.poet);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const createRoom = () => {
    console.log("Reader Id" + authServices.getLoggedInUser()._id);
    console.log("Poet Id:" + poet._id);
    var roomStr = authServices.getLoggedInUser()._id + "$" + poet._id;
    console.log("Room:" + roomStr);
    setRoom(roomStr);
    setUsername(authServices.getLoggedInUser().username);
  };

  useEffect(createRoom, []);

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <button onClick={joinRoom}>Join Chat</button>
        </div>
      ) : (
        <ReaderChatView socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ReaderChat;