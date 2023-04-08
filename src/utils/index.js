export const askForNotificationsAllow = () => {
  console.log("Asking for notifications permission");
  if (!("Notification" in window))
    return console.log("This browser does not support desktop notification");
  if (Notification.permission === "granted")
    return console.log("Notifications allowed");
  Notification.requestPermission();
};

export const notify = (title, options) => {
  if (!("Notification" in window))
    return console.log(
      "Can't send a notification, this browser does not support desktop notification"
    );
  if (Notification.permission === "denied")
    return console.log(
      "Can't send a notification, the notifications are disabled on this site"
    );
  if (Notification.permission === "granted")
    return new Notification(title, options);
};
