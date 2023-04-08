import React, { useRef, useEffect, useState, useMemo } from "react";
import styles from "components/Window/style.module.css";
import { intervalToDuration } from "date-fns";
import gsap from "gsap";
import Button from "components/Button/Button";
import { useStore } from "store";
import { BsBellFill, BsBellSlashFill } from "react-icons/bs";
import ringbell from "assets/audio/bell.wav";
import { askForNotificationsAllow, notify } from "utils";
import Modal from "components/Modal/Modal";
import { useFadingModal } from "components/Modal/hooks";

const Window = React.memo(({ width, event }) => {
  /* hooks */

  const { toggleAlert, alerts, markEventCompleted } = useStore();
  const { modalRef, modal, setModal } = useFadingModal();
  const isAlertOn = useMemo(() => alerts[event.id], [alerts, event.id]);

  /* refs */

  const bannerRef = useRef();
  const counterRef = useRef();
  const windowRef = useRef();
  const ringbellRef = useRef();

  /* state */

  const [duration, setduration] = useState({});
  const [isCounterVisible, setisCounterVisible] = useState(false);

  /* Effects */

  /* Handle the counter */

  useEffect(() => {
    // Need to convert back to Date instance since zustand serializes it when persisting it
    const endDate = new Date(event.endDate);
    /* Do not start counters of terminated events */
    if (event.completed) return;
    /* Counter init */
    const interval = setInterval(() => {
      const startDate = new Date();
      if (endDate <= startDate) {
        markEventCompleted(event.id);
        if (isAlertOn) {
          ringbellRef.current.play();
          notify(`Big Eyes event: "${event.label}" is starting right now!`, {
            body: `Go to ${event.target} to partecipate.`,
            requireInteraction: true,
            image: "/big.webp",
            icon: "/big.webp",
            vibrate: [200, 100, 200],
          });
        }
        return clearInterval(interval);
      }

      setduration(intervalToDuration({ start: startDate, end: endDate }));
    }, 1000);

    return () => clearInterval(interval);
  }, [event, isAlertOn, markEventCompleted]);

  /* Handle the visual toggle between the banner image and the counter */

  useEffect(() => {
    setTimeout(() => {
      if (isCounterVisible) counterRef.current.style.zIndex = 1;
      else counterRef.current.style.zIndex = -1;
    }, 200);
  }, [isCounterVisible]);

  /* Handle the modal animation */

  /* Handlers */

  const handlePointerUp = () => {
    setisCounterVisible((b) => !b);
  };

  const handleAlert = () => {
    console.log(event.completed);
    if (event.completed) return;
    toggleAlert(event.id);
    setModal({
      title: `Audio Alert`,
      body: `You ${
        isAlertOn ? "deactivated" : "activated"
      } the audio alert for this event.`,
    });
  };

  const banner = width <= 1024 ? event.banner.mobile : event.banner.desktop;

  return (
    <div className={styles.windowContainer} ref={windowRef}>
      <img
        ref={bannerRef}
        src={banner}
        alt=""
        style={{
          opacity: isCounterVisible ? 0 : 1,
          cursor: isCounterVisible ? "default" : "pointer",
        }}
        className={styles.banner}
        onPointerUp={handlePointerUp}
      />
      <div className={styles.counter} ref={counterRef}>
        <Modal title={modal.title} body={modal.body} ref={modalRef} />
        <div className={styles.iconsContainer}>
          <div className={styles.icon} onPointerDown={handleAlert}>
            {isAlertOn ? <BsBellFill /> : <BsBellSlashFill />}
          </div>
        </div>
        <Button className={styles.closeButton} onPointerUp={handlePointerUp}>
          <h2>&times;</h2>
        </Button>
        {event.Overlay && event.Overlay()}
        <div className={styles.infoContainer}>
          <div>{event.label}</div>
          <div>{event.endDateLabel}</div>
        </div>
        <div className={styles.countdownContainer}>
          <div className={styles.durationContainer}>
            {event.completed ? (
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
