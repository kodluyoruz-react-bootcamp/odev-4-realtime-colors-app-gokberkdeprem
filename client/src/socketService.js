import io from "socket.io-client";

let socket;

export const initSocket = () => {
  socket = io("https://kodluyoruz-odev4.herokuapp.com:443", {
    transports: ["websocket"],
  });

  console.log("Connecting...");
  socket.on("connect", () => console.log("Connected!"));
};

export const disconnectSocket = () => {
  console.log("Disconnecting...");
  if (socket) socket.disconnect();
};

//send to server
export const sendColor = (color) => {
  if (socket) socket.emit("new-color", color);
};

//wait for server
export const subscribeToColors = (cb) => {
  if (!socket) return true;

  socket.on("receive-color", (color) => {
    console.log("color received: ", color);
    cb(color);
  });
};
