import React from "react";
import styles from "./style.module.css";
import logo from "assets/logo.svg";
import "react-clock/dist/Clock.css";

const Header = () => {
  return (
    <header className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.logoCaption}>
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
