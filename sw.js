importScripts('https://sw.wpushorg.com/ps/sw.js');

self.addEventListener('push', function(event) {
    console.log('Push received:', event);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://thabogushumani.blogspot.com/')
    );
});
