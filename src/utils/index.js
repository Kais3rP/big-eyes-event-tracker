export const askForNotificationsAllow = () => {
  if (!("Notification" in window))
    return console.log("This browser does not support desktop notification");
  if (Notification.permission === "granted")
    return console.log("Notifications allowed");
  Notification.requestPermission();
};

export const notify = (title, options) => {
  if (!("Notification" in window))
    return console.log("This browser does not support desktop notification");
  if (Notification.permission === "denied")
    return console.log("The notifications are disabled on this site");
  if (Notification.permission === "granted")
    return new Notification(title, options);
};
