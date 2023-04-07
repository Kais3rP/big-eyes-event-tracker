import React from "react";
import styles from "./style.module.css";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>You are welcome to partecipate to this project</div>
      <span className={styles.icon}>
        <FiGithub />
      </span>
      <div>This is a beta version, feel free to report issues or features requests.</div>
    </div>
  );
};

export default Footer;
