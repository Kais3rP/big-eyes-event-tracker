import React from "react";
import styles from "./style.module.css";
import { FiGithub } from "react-icons/fi";
import pkg from "../../../package.json";

const { repository } = pkg;

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>You are welcome to partecipate to this project.</div>
        <div>
          This is a beta version, it might be buggy or show glitches depending
          on the browser / device it is executed. Feel free to report issues or
          features requests.
        </div>
      </div>

      <a
        href={repository}
        target="_blank"
        rel="noreferrer noopener"
        className={styles.icon}
      >
        <FiGithub />
      </a>
    </div>
  );
};

export default Footer;
