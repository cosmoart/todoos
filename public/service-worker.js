const CACHE_NAME = 'mi-aplicacion-pwa-v1'
const CACHE_FILES = [
	'/',
	'/index.html',
	'/main.js',
	'/styles.css',
	'/manifest.json',
	'/favicon.svg'
]

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(CACHE_FILES)
		})
	)
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request)
		})
	)
})

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName.startsWith('mi-aplicacion-pwa-') && cacheName !== CACHE_NAME
				}).map(function (cacheName) {
					return caches.delete(cacheName)
				})
			)
		})
	)
})
