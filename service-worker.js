var filesToCache = ['./*',
    './leaflet/*',
    './leaflet/images/*'
];
var staticCacheName = 'pages-cache-v1';
self.addEventListener('install', function (event) {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(filesToCache);
    }));
});