// Service Worker for Image Optimization and Caching

const CACHE_NAME = 'deliwer-images-v1';
const IMAGE_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// Image optimization configuration
const OPTIMIZATION_CONFIG = {
  quality: {
    'slow-2g': 40,
    '2g': 50,
    '3g': 70,
    '4g': 85,
    'default': 75
  },
  formats: {
    webp: 'image/webp',
    avif: 'image/avif', 
    jpg: 'image/jpeg',
    png: 'image/png'
  }
};

// Install event
self.addEventListener('install', (event) => {
  console.log('Image optimizer service worker installed');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Image optimizer service worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - handle image requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle image requests
  if (isImageRequest(event.request)) {
    event.respondWith(handleImageRequest(event.request));
  }
});

// Check if request is for an image
function isImageRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.toLowerCase();
  
  return (
    request.destination === 'image' ||
    /\.(jpg|jpeg|png|webp|avif|gif|svg)(\?|$)/i.test(pathname) ||
    url.searchParams.has('w') || // Width parameter suggests image optimization
    url.searchParams.has('h') || // Height parameter suggests image optimization
    url.searchParams.has('q')    // Quality parameter suggests image optimization
  );
}

// Handle image requests with optimization and caching
async function handleImageRequest(request) {
  const url = new URL(request.url);
  const cacheKey = generateCacheKey(request);
  
  try {
    // Check cache first
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(cacheKey);
    
    if (cachedResponse && !isExpired(cachedResponse)) {
      return cachedResponse;
    }

    // Fetch and optimize image
    const optimizedRequest = optimizeImageRequest(request);
    const response = await fetch(optimizedRequest);
    
    if (response.ok) {
      // Clone response for caching
      const responseToCache = response.clone();
      
      // Add timestamp header for expiration tracking
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cached-at', Date.now().toString());
      
      const optimizedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      // Cache the response
      cache.put(cacheKey, optimizedResponse.clone());
      
      return optimizedResponse;
    }
    
    return response;
  } catch (error) {
    console.error('Error handling image request:', error);
    
    // Try to return cached version even if expired
    const cache = await caches.open(CACHE_NAME);
    const fallbackResponse = await cache.match(cacheKey);
    
    if (fallbackResponse) {
      return fallbackResponse;
    }
    
    // Return placeholder image as last resort
    return createPlaceholderResponse();
  }
}

// Optimize image request based on network conditions
function optimizeImageRequest(request) {
  const url = new URL(request.url);
  const connection = getConnectionType();
  
  // Adjust quality based on connection
  if (!url.searchParams.has('q')) {
    const quality = OPTIMIZATION_CONFIG.quality[connection] || OPTIMIZATION_CONFIG.quality.default;
    url.searchParams.set('q', quality.toString());
  }
  
  // Set optimal format if not specified
  if (!url.searchParams.has('f')) {
    const optimalFormat = getOptimalFormat();
    if (optimalFormat !== 'jpg') {
      url.searchParams.set('f', optimalFormat);
    }
  }
  
  return new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    mode: request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer
  });
}

// Generate cache key for image requests
function generateCacheKey(request) {
  const url = new URL(request.url);
  
  // Normalize parameters for consistent caching
  const params = new URLSearchParams();
  
  // Sort parameters for consistent key generation
  for (const [key, value] of url.searchParams.entries()) {
    params.set(key, value);
  }
  
  params.sort();
  
  return `${url.origin}${url.pathname}?${params.toString()}`;
}

// Check if cached response is expired
function isExpired(response) {
  const cachedAt = response.headers.get('sw-cached-at');
  
  if (!cachedAt) {
    return true;
  }
  
  const cacheTime = parseInt(cachedAt, 10);
  const now = Date.now();
  
  return (now - cacheTime) > IMAGE_CACHE_DURATION;
}

// Get connection type for optimization
function getConnectionType() {
  // This would be set by the main thread via message
  return self.connectionType || 'default';
}

// Get optimal image format
function getOptimalFormat() {
  // This would be set by the main thread via message
  return self.optimalFormat || 'jpg';
}

// Create placeholder response for failed requests
function createPlaceholderResponse() {
  // Simple 1x1 transparent pixel
  const pixelData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const bytes = Uint8Array.from(atob(pixelData), c => c.charCodeAt(0));
  
  return new Response(bytes, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-cache'
    }
  });
}

// Listen for messages from main thread
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'UPDATE_CONNECTION':
      self.connectionType = data.connectionType;
      break;
    case 'UPDATE_FORMAT_SUPPORT':
      self.optimalFormat = data.optimalFormat;
      break;
    case 'PRELOAD_IMAGES':
      preloadImages(data.urls);
      break;
  }
});

// Preload critical images
async function preloadImages(urls) {
  const cache = await caches.open(CACHE_NAME);
  
  const preloadPromises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.error('Failed to preload image:', url, error);
    }
  });
  
  await Promise.all(preloadPromises);
}