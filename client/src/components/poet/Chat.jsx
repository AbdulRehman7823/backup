import React from "react";
import "./chatStyle.css";
import { useState,useEffect } from "react";
import ChatView from "./ChatView";
import {useLocation} from 'react-router-dom';
import authServices from "../Services/AuthServices";
import socket from "../../sockets"



function Chat() {
  console.log("ChatComponentParent")
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [patient, setPatient] = useState(location.state.patient);
  const [showChat,setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const createRoom =  ()=>{
    console.log("patientId"+patient.patientId);
    console.log("DoctorID:"+authServices.getLoggedInUser()._id)
    var roomStr = patient.patientId+"$"+authServices.getLoggedInUser()._id;
    console.log("Room:"+roomStr);
    setRoom(roomStr);
    setUsername(authServices.getLoggedInUser().username);    
  }

  useEffect(createRoom,[])

  return (
    <div className="App">
    {!showChat ? (
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <button onClick={joinRoom}>Join Chat</button>
      </div>
    ) : (
      <ChatView socket={socket} username={username} room={room} />
    )}
  </div>
  );
}

export default Chat;