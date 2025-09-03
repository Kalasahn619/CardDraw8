const CACHE_NAME = 'carddraw8-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './Joker.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://fonts.gstatic.com'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache.map(url => new Request(url, {
          cache: 'reload'
        })));
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Serving from cache:', event.request.url);
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // If both cache and network fail, return a custom offline page
          if (event.request.destination === 'document') {
            return caches.match('./');
          }
          
          // For other resources, return a basic response
          if (event.request.destination === 'image') {
            return new Response('', {
              status: 200,
              statusText: 'OK',
              headers: new Headers({
                'Content-Type': 'image/svg+xml'
              })
            });
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim control of all clients
      return self.clients.claim();
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any background sync tasks here
      Promise.resolve().then(() => {
        console.log('Background sync completed');
      })
    );
  }
});

// Push notification support
self.addEventListener('push', (event) => {
  console.log('Push notification received');
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New mystical insight available!',
      icon: './icon-192.png',
      badge: './icon-192.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || './'
      },
      actions: [
        {
          action: 'open',
          title: 'Open CardDraw8',
          icon: './icon-192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: './icon-192.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'CardDraw8', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.action);
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || './')
    );
  }
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('Periodic sync event:', event.tag);
  if (event.tag === 'content-sync') {
    event.waitUntil(
      // Perform periodic tasks here
      Promise.resolve().then(() => {
        console.log('Periodic sync completed');
      })
    );
  }
});

// Handle app installation
self.addEventListener('appinstalled', (event) => {
  console.log('CardDraw8 app was installed');
  // Track app installation
});

// Handle beforeinstallprompt (though this is typically handled in the main thread)
self.addEventListener('beforeinstallprompt', (event) => {
  console.log('Before install prompt');
  // This event is usually handled in the main thread, not the service worker
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

// Cache management utilities
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => name !== CACHE_NAME);
  
  return Promise.all(
    oldCaches.map(name => {
      console.log('Deleting old cache:', name);
      return caches.delete(name);
    })
  );
}

// Preload critical resources
async function preloadCriticalResources() {
  const cache = await caches.open(CACHE_NAME);
  const criticalResources = [
    './',
    './manifest.json',
    './icon-192.png',
    './Joker.png'
  ];
  
  return cache.addAll(criticalResources);
}

// Network-first strategy for API calls (if you add any in the future)
function networkFirst(request) {
  return fetch(request)
    .then(response => {
      if (response.ok) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });
      }
      return response;
    })
    .catch(() => {
      return caches.match(request);
    });
}

// Cache-first strategy for static assets
function cacheFirst(request) {
  return caches.match(request)
    .then(response => {
      if (response) {
        return response;
      }
      return fetch(request).then(fetchResponse => {
        const responseClone = fetchResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });
        return fetchResponse;
      });
    });
}

console.log('CardDraw8 Service Worker loaded');