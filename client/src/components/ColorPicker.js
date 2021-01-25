import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import {
  disconnectSocket,
  initSocket,
  subscribeToColors,
  sendColor,
} from "../socketService";

function ColorPicker() {
  const [pageColor, setPageColor] = useState({});
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChangeComplete = (color) => {
    setPageColor({ background: color.hex });
  };
  const handleClick = () => {
    console.log("clicked");
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleSend = () => {
    sendColor(pageColor);
  };

  useEffect(() => {
    console.log(pageColor.background);
  }, [pageColor]);

  useEffect(() => {
    initSocket();
    subscribeToColors((recievedColor) => setPageColor(recievedColor));
    return () => disconnectSocket();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh ",
        backgroundColor: `${pageColor.background}`,
      }}
    >
      <button onClick={handleClick}>Pick Color</button>
      {displayColorPicker ? (
        <div style={{ display: "flex" }}>
          <SketchPicker
            color={pageColor.background}
            onChangeComplete={handleChangeComplete}
            style={{
              width: "100%",
              margin: "auto !important",
            }}
          />
        </div>
      ) : null}

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ColorPicker;
