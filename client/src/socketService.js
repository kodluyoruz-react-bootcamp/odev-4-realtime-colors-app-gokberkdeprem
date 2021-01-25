import io from "socket.io-client";

let socket;

//socket connection initialization
export const initSocket = () => {
  socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  console.log("Connecting...");
  socket.on("connect", () => console.log("Connected!"));
};

//when client disconnected, we use at unmount moment
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
