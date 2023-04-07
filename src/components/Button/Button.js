import React from "react";
import styles from "./style.module.css";

const Button = ({ children, className, ...props }) => {
  return (
    <button className={`${styles.container} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
