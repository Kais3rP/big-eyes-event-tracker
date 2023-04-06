import React, { useRef, useEffect, useState } from "react";
import styles from "components/Window/style.module.css";
import { intervalToDuration } from "date-fns";

const Window = React.memo(({ width, event }) => {
  const bannerRef = useRef();
  const counterRef = useRef();
  const windowRef = useRef();
  const [duration, setduration] = useState({});
  const [toggleCounter, settoggleCounter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const startDate = new Date();
      setduration(intervalToDuration({ start: startDate, end: event.endDate }));
    }, 1000);

    return () => clearInterval(interval);
  }, [event.endDate]);

  const handlePointerDown = () => {
    settoggleCounter((b) => !b);
  };

  const banner = width <= 1024 ? event.banner.mobile : event.banner.desktop;

  return (
    <div className={styles.windowContainer}>
      <div
        ref={windowRef}
        className={`${styles.window}`}
        onPointerDown={handlePointerDown}
      >
        <img
          ref={bannerRef}
          src={banner}
          alt=""
          style={{ opacity: toggleCounter ? 0 : 1 }}
          className={styles.countdownBanner}
        />
        <div ref={counterRef} className={styles.countdownCounter}>
          {event.Overlay && event.Overlay()}
          <div className={styles.infoContainer}>
            {" "}
            <div>{event.label}</div>
            <div>{event.endDateLabel}</div>
          </div>

          <div className={styles.counterTextContainer}>
            <div className={styles.counterNumber}>
              {(duration.days + duration.months * 30 || 0)
                .toString()
                .padStart(2, "0")}
            </div>
            <div>:</div>
            <div className={styles.counterNumber}>
              {(duration.hours || 0).toString().padStart(2, "0")}
            </div>
            <div>:</div>
            <div className={styles.counterNumber}>
              {" "}
              {(duration.minutes || 0).toString().padStart(2, "0")}
            </div>
            <div>:</div>
            <div className={styles.counterNumber}>
              {" "}
              {(duration.seconds || 0).toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Window;
