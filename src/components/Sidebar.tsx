import React, { useState, useRef } from "react";
interface Props {
  setAllowResize: (value: boolean) => void;
  setAllowTimeInScreen: (value: boolean) => void;
  setAllowRotate: (value: boolean) => void;
  allowResize: boolean;
  allowTimeInScreen: boolean;
  allowRotate: boolean;
}

const Sidebar: React.FC<Props> = ({
  setAllowResize,
  setAllowTimeInScreen,
  setAllowRotate,
  allowResize,
  allowTimeInScreen,
  allowRotate,
}) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const sidebarInner = useRef<HTMLDivElement | null>(null);
  const showHideText = showSidebar ? "X" : "+";
  const toggleSidebar = () => {
    console.log(sidebarInner.current?.classList);
    sidebarInner.current?.classList.toggle("hidden");
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      <div className="sidebar">
        <div onClick={toggleSidebar} className="hide-me">
          {showHideText}
        </div>
        <div className="sidebar-inner" ref={sidebarInner}>
          <h2>Settings</h2>
          <div>
            <label htmlFor="resize">Allow Logo Resize</label>
            <input
              type="checkbox"
              id="resize"
              onChange={(e) => setAllowResize(e.target.checked)}
              checked={allowResize}
            />
          </div>
          <div>
            <label htmlFor="timeInScreen">Allow Screen timer</label>
            <input
              type="checkbox"
              id="timeInScreen"
              onChange={(e) => setAllowTimeInScreen(e.target.checked)}
              checked={allowTimeInScreen}
            />
          </div>
          <div>
            <label htmlFor="rotate">Allow Rotation</label>
            <input
              type="checkbox"
              id="rotate"
              value="true"
              onChange={(e) => {
                setAllowRotate(e.target.checked);
              }}
              checked={allowRotate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
