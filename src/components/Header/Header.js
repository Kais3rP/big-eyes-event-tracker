import React from "react";
import styles from "./style.module.css";
import logo from "assets/logo.svg";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { useClock } from "hooks";

const Header = () => {
  const value = useClock();
  return (
    <header className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.logoCaption}>
        {/*     <div className={styles.clock}>
          <Clock value={value} size={"min(100px,20vmin)"} />
        </div> */}
        <div>
          Unofficial Events Tracker for
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
    </header>
  );
};

export default Header;
