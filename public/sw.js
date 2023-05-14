const CACHE_NAME = 'todoos-v1'
const CACHE_FILES = [
	'./',
	'./manifest.json',
	'./favicon.svg'
]

self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => cache.addAll(CACHE_FILES).then(() => self.skipWaiting()))
			.catch((err) => console.log('Falló registro de cache', err))
	)
})

self.addEventListener('activate', (e) => {
	const cacheWhitelist = [CACHE_NAME]

	e.waitUntil(
		caches.keys()
			.then((cacheNames) => {
				return Promise.all(cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName)
					}
					return true
				})
				)
			})
			.then(() => self.clients.claim())
	)
})

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then((res) => {
			if (res) return res
			return fetch(e.request)
		})
	)
})
