'use strict';

// ===== Import scripts =====
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');
importScripts('https://sw.wpushorg.com/ps/sw.js'); // wpushorg ad script

// ===== Initialize Firebase =====
firebase.initializeApp({
apiKey: "AIzaSyBk9CnCJlTnSkvdC2PNB6UYiV0BnAkO088",
authDomain: "work-from-anywhere-ac57b.firebaseapp.com",
projectId: "work-from-anywhere-ac57b",
storageBucket: "work-from-anywhere-ac57b.firebasestorage.app",
messagingSenderId: "1058696678009",
appId: "1:1058696678009:web:a408c66c367439a22b22a8",
measurementId: "G-KJ1LHJWTZX"
});

const messaging = firebase.messaging();

// ===== Firebase Background Messages =====
messaging.onBackgroundMessage(payload => {
console.log('[SW] Firebase message received:', payload);
const notificationTitle = payload.notification?.title || 'Notification';
const notificationOptions = {
body: payload.notification?.body || '',
icon: payload.notification?.icon || '/icon.png',
data: payload.data || {}
};
self.registration.showNotification(notificationTitle, notificationOptions);
});

// ===== wpushorg Push Events =====
self.addEventListener('push', event => {
if (typeof wpushorgOnPush === 'function') wpushorgOnPush(event);
});

// ===== Notification Clicks =====
self.addEventListener('notificationclick', event => {
event.notification.close();

// If wpushorg click handler exists, use it
if (typeof wpushorgOnClick === 'function') {
wpushorgOnClick(event);
return;
}

// Otherwise handle Firebase notification clicks
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

// ===== Optional Logging =====
self.addEventListener('pushsubscriptionchange', event => {
console.log('[SW] Push subscription changed:', event);
});
self.addEventListener('activate', event => {
console.log('[SW] Service worker activated');
});
self.addEventListener('install', event => {
console.log('[SW] Service worker installed');
});
