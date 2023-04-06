import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setwindowSize] = useState({});

  useEffect(() => {
    setwindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setwindowSize({ width, height });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setwindowSize]);

  return windowSize;
};
