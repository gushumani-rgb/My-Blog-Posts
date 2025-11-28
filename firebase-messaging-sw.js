'use strict';

// 1. Import required scripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');
importScripts('https://sw.wpushorg.com/ps/sw.js'); // wpushorg ad script

// 2. Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBk9CnCJlTnSkvdC2PNB6UYiV0BnAkO088",
  authDomain: "work-from-anywhere-ac57b.firebaseapp.com",
  projectId: "work-from-anywhere-ac57b",
  storageBucket: "work-from-anywhere-ac57b.firebasestorage.app",
  messagingSenderId: "1058696678009",
  appId: "1:1058696678009:web:a408c66c367439a22b22a8",
  measurementId: "G-KJ1LHJWTZX"
});

// 3. Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// 4. Handle Firebase background messages
messaging.onBackgroundMessage(payload => {
  console.log('[SW] Firebase background message received:', payload);
  const notificationTitle = payload.notification?.title || 'Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: payload.notification?.icon || '/icon.png',
    data: payload.data || {}
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 5. Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (typeof wpushorgOnClick === 'function') {
    wpushorgOnClick(event);
    return;
  }
  const clickAction = event.notification?.data?.click_action || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url === clickAction && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(clickAction);
    })
  );
});

// 6. Log push events for debugging (optional)
self.addEventListener('push', event => {
  console.log('[SW] Push event received:', event);
});
