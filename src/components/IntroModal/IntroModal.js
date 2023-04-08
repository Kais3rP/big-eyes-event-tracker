import styles from "./style.module.css";
import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";
import { useUIStore } from "store";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useStore } from "store";

const IntroModal = () => {
  const { isIntroModalVisible, hideIntroModal } = useUIStore();
  const { notificationsStatus, updateNotificationsStatus } = useStore();

  const ref = useRef();

  const handleAcceptNotifications = () => {
    Notification.requestPermission(function (result) {
      console.log("Asking for notifications permission");
      updateNotificationsStatus(result);
    });

    Notification.requestPermission().then(function (result) {
      console.log("Asking for notifications permission", result);
      updateNotificationsStatus(result);
    });
  };

  const handleRejectNotifications = () => {
    hideIntroModal();
  };

/* 
notificationStatus can be:
1- granted
2- denied
3- default 

Case 1, we hide the modal since there's nothing to ask.
Case 2, we show the modal where we ask to change the browser settings.
Case 3, we show the modal with the chance to display the requestPermission prompt.
*/

  return (
    isIntroModalVisible &&
    notificationsStatus !== "granted" && (
      <div className={styles.container} ref={ref}>
        {notificationsStatus === "default" ? (
          <Modal
            title={"Notifications"}
            body={
              <>
                this page makes use of web notifications to alert you when the
                event has expired. click
                <em>accept</em>
                to enable browser notifications, or <em>reject</em> to disable
                them
              </>
            }
            className={styles.modal}
          >
            <div className={styles.buttonsContainer}>
              <Button onPointerDown={handleAcceptNotifications}>accept</Button>
              <Button onPointerDown={handleRejectNotifications}>reject</Button>
            </div>
          </Modal>
        ) : (
          <Modal
            title={"Notifications"}
            body={
              <>
                it looks like you have disabled the notifications for this web
                page, if you decide to continue you won't receive any
                notification when an event expires. to change the preferences go
                to your browser settings.
              </>
            }
            className={styles.modal}
          >
            <div className={styles.buttonsContainer}>
              <Button onPointerDown={hideIntroModal}>OK</Button>
            </div>
          </Modal>
        )}
      </div>
    )
  );
};

export default IntroModal;
