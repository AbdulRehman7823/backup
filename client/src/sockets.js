import io from "socket.io-client";

const socket = io.connect("https://ar-medicare-backend.herokuapp.com/");

export default socket;
