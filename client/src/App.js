import "./App.css";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import {
  disconnectSocket,
  initSocket,
  subscribeToColors,
  sendColor,
} from "./socketService";

function App() {
  const [backColor, setBackColor] = useState({});
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChangeComplete = (color) => {
    setBackColor({ background: color.hex });
  };
  const handleClick = () => {
    console.log("clicked");
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleSend = () => {
    sendColor(backColor);
  };

  useEffect(() => {
    console.log(backColor.background);
  }, [backColor]);

  useEffect(() => {
    initSocket();
    subscribeToColors((recievedColor) => setBackColor(recievedColor));
    return () => disconnectSocket();
  }, []);

  return (
    <div className="App">
      <button onClick={handleClick}>Pick Color</button>
      {displayColorPicker ? (
        <div>
          <SketchPicker
            color={backColor.background}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      ) : null}

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
