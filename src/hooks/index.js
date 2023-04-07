import { useEffect, useState } from "react";
import { askForNotificationsAllow } from "utils";

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

const useLocalStorage = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined")
      throw Error(
        "You can't use local storage in an environment different from a browser."
      );
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  const setValue = (value) => {
    if (typeof window === "undefined")
      throw Error(
        "You can't use local storage in an environment different from a browser."
      );
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export const useNotifications = () => {
  useEffect(() => {
    askForNotificationsAllow();
  }, []);
};
