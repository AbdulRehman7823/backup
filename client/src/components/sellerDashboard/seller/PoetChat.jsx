import React from "react";
import "./chatStyle.css";
import { useState, useEffect } from "react";
import PoetChatView from "./PoetChatView";
import { useLocation } from "react-router-dom";
import authServices from "../../Services/AuthServices";

import socket from "../../../sockets";

function PoetChat() {
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [reader, setReader] = useState(location.state.reader);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const createRoom = () => {
    console.log("poet Id:" + authServices.getLoggedInUser()._id);
    console.log("Poet Id:" + reader.readerId);
    var roomStr = reader.readerId + "$" + authServices.getLoggedInUser()._id;
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
        <PoetChatView socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default PoetChat;
