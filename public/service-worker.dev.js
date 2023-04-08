/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

/* In this module "self" is guaranteed to point to the ServiceWorkerGlobalScope in which you can find properties such as clients, registration or caches and a variety of event handlers.  */

/* This service-worker won't work in prudction, it's just needed to test some features in dev environment */

console.log("Service worker running in development mode");

/* Event listeners */

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
