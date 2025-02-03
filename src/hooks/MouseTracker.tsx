import { useEffect, useState } from "react";

const useMouseTracker = () => {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
    isInViewport: boolean;
  }>({
    x: 0,
    y: 0,
    isInViewport: true,
  });

  function handleMouseout() {
    setMousePosition((prev) => ({ ...prev, isInViewport: false }));
  }

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY, isInViewport: true });
    };
    document.addEventListener("mouseout", handleMouseout);
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseout", handleMouseout);
    };
  }, []);

  return mousePosition;
};

export default useMouseTracker;
