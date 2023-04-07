import logo from "assets/logo.svg";
import styles from "components/style.module.css";
import { useWindowSize } from "hooks";
import Window from "./Window/Window";
import { useEffect } from "react";
import { events } from "data";

function App() {
  const { width } = useWindowSize();

  useEffect(() => {
    window.addEventListener("notificationclick", (e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.logoCaption}>
        {" "}
        <div>
          Unofficial Events Tracker for{" "}
          <a
            href="https://bigeyes.space/"
            target="_blank"
            rel="noreferrer noopener"
          >
            $BIG EYES
          </a>
          Token
        </div>
      </div>

      <div className={styles.clock}></div>
      {events.map((event) => (
        <Window key={event.label} event={event} width={width} />
      ))}
    </div>
  );
}

export default App;
