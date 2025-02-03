import React, { SyntheticEvent, useEffect, useState, useRef } from "react";
import reactLogo from "../assets/react.svg";
import MouseTracker from "../hooks/MouseTracker";

interface ReactIconProps {
  allowResize: boolean;
  allowTimeInScreen: boolean;
  allowRotate: boolean;
}

const ReactIcon: React.FC<ReactIconProps> = ({
  allowResize,
  allowTimeInScreen,
  allowRotate,
}) => {
  const iconRef = useRef<HTMLImageElement | null>(null);
  const { x, y, isInViewport } = MouseTracker();

  const [timeInScreen, setTimeInScreen] = useState(0);
  const rotate = (e: SyntheticEvent) => {
    const target = e.target as HTMLImageElement;

    if (!allowRotate) {
      target.classList.remove("rotate");
      target.classList.remove("rotate-reverse");
      return false;
    }
    if (
      target.classList.contains("rotate") ||
      target.classList.contains("rotate-reverse")
    ) {
      target.classList.toggle("rotate");
      target.classList.toggle("rotate-reverse");
    } else {
      target.classList.add("rotate");
    }
  };
  //create click on state change
  useEffect(() => {
    const logoElement = iconRef.current;
    if (logoElement) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      logoElement.dispatchEvent(event);
    }
  }, [allowRotate]);

  useEffect(() => {
    const updateSize = () => {
      if (iconRef.current) {
        const minSize = 50;
        const maxSize = 250;
        const rect = iconRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt((centerX - x) ** 2 + (centerY - y) ** 2);
        const newSize = Math.max(minSize, maxSize - distance / 5);
        iconRef.current.style.width = `${newSize}px`;
      }
    };

    if (allowResize) {
      updateSize();
      console.log("fired");
      window.addEventListener("resize", updateSize);
      window.addEventListener("scroll", updateSize);
      return () => {
        window.removeEventListener("resize", updateSize);
        window.removeEventListener("scroll", updateSize);
      };
    }
  }, [x, y, isInViewport, allowResize]);

  useEffect(() => {
    if (!allowTimeInScreen) return;
    let interval: number | null = null;
    let prevX = x,
      prevY = y;

    const startTracking = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        if (x === prevX && y === prevY && isInViewport) {
          setTimeInScreen((t) => t + 1);
        } else {
          prevX = x;
          prevY = y;
        }
      }, 1000);
    };

    startTracking();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [x, y, isInViewport, allowTimeInScreen]);

  return (
    <>
      <div className="icon-container">
        <img
          src={reactLogo}
          ref={iconRef}
          onClick={(e) => rotate(e)}
          className="logo react"
          alt="React logo"
        />
        {timeInScreen > 0 && (
          <p className="time-tracker">Time in screen: {timeInScreen}</p>
        )}
      </div>
    </>
  );
};

export default ReactIcon;
