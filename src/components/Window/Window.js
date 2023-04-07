import React, { useRef, useEffect, useState, useMemo } from "react";
import styles from "components/Window/style.module.css";
import { intervalToDuration } from "date-fns";
import gsap from "gsap";
import Button from "components/Button/Button";
import { useStore } from "store";
import { BsBellFill, BsBellSlashFill } from "react-icons/bs";
import ringbell from "assets/audio/bell.wav";
import { askForNotificationsAllow, notify } from "utils";

const Window = React.memo(({ width, event }) => {
  /* hooks */

  const { toggleAlert, alerts } = useStore();
  const isAlertOn = useMemo(() => alerts[event.id], [alerts, event.id]);

  /* refs */

  const bannerRef = useRef();
  const counterRef = useRef();
  const windowRef = useRef();
  const ringbellRef = useRef();

  /* state */

  const [duration, setduration] = useState({});
  const [toggleCounter, settoggleCounter] = useState(false);

  /* Effects */

  useEffect(() => {
    /* Do not start counters of terminated events */
    if (event.endDate <= new Date())
      return setduration((d) => ({ ...d, completed: true }));
    /* Counter init */
    const interval = setInterval(() => {
      const startDate = new Date();
      if (event.endDate <= startDate) {
        setduration((d) => ({ ...d, completed: true }));
        if (isAlertOn) {
          ringbellRef.current.play();
          notify(`Big Eyes event: "${event.label}" is starting right now!`, {
            body: `Go to ${event.target} to partecipate.`,
            requireInteraction: true,
            image: "https://bigeyes.space/img/logo-desktop-header.svg",
            icon: "https://bigeyes.space/img/logo-desktop-header.svg",
          });
        }
        return clearInterval(interval);
      }
      setduration(intervalToDuration({ start: startDate, end: event.endDate }));
    }, 1000);

    return () => clearInterval(interval);
  }, [event, isAlertOn]);

  useEffect(() => {
    setTimeout(() => {
      if (toggleCounter) counterRef.current.style.zIndex = 1;
      else counterRef.current.style.zIndex = -1;
    }, 200);
  }, [toggleCounter]);

  /* Handlers */

  const handlePointerUp = () => {
    settoggleCounter((b) => !b);
    askForNotificationsAllow();
  };

  const handleAlert = () => {
    toggleAlert(event.id);
  };

  const banner = width <= 1024 ? event.banner.mobile : event.banner.desktop;

  return (
    <div className={styles.windowContainer} ref={windowRef}>
      <img
        ref={bannerRef}
        src={banner}
        alt=""
        style={{
          opacity: toggleCounter ? 0 : 1,
          cursor: toggleCounter ? "default" : "pointer",
        }}
        className={styles.banner}
        onPointerUp={handlePointerUp}
      />
      <div className={styles.counter} ref={counterRef}>
        <div className={styles.iconsContainer}>
          <div
            className={styles.icon}
            style={{
              transform: `scale(${isAlertOn ? 1.1 : 1})`,
            }}
            onPointerDown={handleAlert}
          >
            {isAlertOn ? <BsBellFill /> : <BsBellSlashFill />}
          </div>
        </div>
        <Button className={styles.closeButton} onPointerUp={handlePointerUp}>
          &times;
        </Button>
        {event.Overlay && event.Overlay()}
        <div className={styles.infoContainer}>
          <div>{event.label}</div>
          <div>{event.endDateLabel}</div>
        </div>
        <div className={styles.countdownContainer}>
          <div className={styles.durationContainer}>
            {duration.completed ? (
              <div className={styles.durationNumbers}>TERMINATED</div>
            ) : (
              <>
                <div className={styles.durationNumbers}>
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
                <div className={styles.durationText}>{`( ${
                  duration.months * 30 + duration.days
                } Days, ${duration.hours} Hours, ${duration.minutes} Minutes, ${
                  duration.seconds
                } seconds )`}</div>
              </>
            )}
          </div>
        </div>
        {/* Buttons */}
        {/* <div className={styles.buttonsContainer}>
          <Button disabled={event.completed} onPointerDown={handleAlert}>
            {isAlertOn ? "disable alert" : "enable alert"}
          </Button>
        </div>*/}
      </div>
      <audio ref={ringbellRef} src={ringbell}></audio>
    </div>
  );
});

export default Window;
