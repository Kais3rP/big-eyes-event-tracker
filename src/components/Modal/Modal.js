import React from "react";
import styles from "./style.module.css";

const Modal = React.forwardRef(
  ({ title, body, className, children, ...props }, ref) => {
    return (
      <div className={`${styles.container} ${className}`} ref={ref}>
        <h1>{title}</h1>
        <h2>{body}</h2>
        {children}
      </div>
    );
  }
);

export default Modal;
