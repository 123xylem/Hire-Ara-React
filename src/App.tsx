import { useState } from "react";
import ReactIcon from "./components/ReactIcon";
import Sidebar from "./components/Sidebar";
import "./App.css";
function App() {
  const [allowResize, setAllowResize] = useState(true);
  const [allowTimeInScreen, setAllowTimeInScreen] = useState(true);
  const [allowRotate, setAllowRotate] = useState(true);

  return (
    <>
      <ReactIcon
        allowResize={allowResize}
        allowTimeInScreen={allowTimeInScreen}
        allowRotate={allowRotate}
      />
      <Sidebar
        setAllowResize={setAllowResize}
        setAllowTimeInScreen={setAllowTimeInScreen}
        setAllowRotate={setAllowRotate}
        allowResize={allowResize}
        allowTimeInScreen={allowTimeInScreen}
        allowRotate={allowRotate}
      />
    </>
  );
}

export default App;
