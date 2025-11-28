// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Initialize Firebase inside the service worker
firebase.initializeApp({
apiKey: "AIzaSyBk9CnCJlTnSkvdC2PNB6UYiV0BnAkO088",
authDomain: "work-from-anywhere-ac57b.firebaseapp.com",
projectId: "work-from-anywhere-ac57b",
storageBucket: "work-from-anywhere-ac57b.firebasestorage.app",
messagingSenderId: "1058696678009",
appId: "1:1058696678009:web:a408c66c367439a22b22a8",
measurementId: "G-KJ1LHJWTZX"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
console.log('[firebase-messaging-sw.js] Received background message ', payload);

const notificationTitle = payload.notification.title;
const notificationOptions = {
body: payload.notification.body,
icon: payload.notification.icon || 'https://your-blog-icon-url.png'
};

self.registration.showNotification(notificationTitle, notificationOptions);
});
