import { SyntheticEvent } from "react";
import reactLogo from "../assets/react.svg";
const ReactIcon = () => {
  const rotate = (e: SyntheticEvent) => {
    const target = e.target as HTMLImageElement;
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
  return (
    <>
      <img
        src={reactLogo}
        onClick={(e) => rotate(e)}
        className="logo react"
        alt="React logo"
      />
    </>
  );
};

export default ReactIcon;
