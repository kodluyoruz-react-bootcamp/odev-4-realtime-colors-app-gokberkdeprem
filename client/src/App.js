import "./App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SketchPicker } from "react-color";

function App() {
  const [log, setLog] = useState([]);
  const [backColor, setBackColor] = useState({});

  const handleChangeComplete = (color) => {
    setBackColor({ background: color.hex });
  };

  useEffect(() => {
    console.log(backColor.background);
  }, [backColor]);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    socket.on("new-user", ({ title }) => {
      setLog((p) => [...p, { title }]);
    });
  }, []);

  return (
    <div className="App">
      <SketchPicker
        color={backColor.background}
        onChangeComplete={handleChangeComplete}
      />
      {log.map((item, i) => (
        <div key={i}>{item.title}</div>
      ))}
    </div>
  );
}

export default App;
