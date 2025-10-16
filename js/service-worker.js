const CACHE_NAME = "tickets-app-cache-v3";
const urlsToCache = [
  "./",
  "./index.html",
  "./css/new.css",
  "./js/main.js",
  "./icon/ticket-192.png",
  "./icon/ticket-512.png"
];

// ✅ Install: Cache core files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// ✅ Activate: Remove old cache versions
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
});

// ✅ Fetch: Don't touch Google Maps or external requests
self.addEventListener("fetch", event => {
  const url = event.request.url;

  // ⛔ Skip caching Google Maps, fonts, analytics, etc.
  if (
    url.includes("google.com/maps") ||
    url.includes("maps.googleapis.com") ||
    url.includes("gstatic.com") ||
    url.includes("googleapis.com")
  ) {
    return; // let the browser handle Google requests directly
  }

  // ✅ Cache-first for your own files
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.destination === "document") {
            return new Response(
              `
              <html>
              <head><title>Offline</title></head>
              <body style="text-align:center;font-family:sans-serif;">
                <h1>📴 You’re Offline</h1>
                <p>Don’t worry — your tickets are still safe!</p>
                <button onclick="location.reload()">Try Again</button>
              </body>
              </html>
              `,
              { headers: { "Content-Type": "text/html" } }
            );
          }
        })
      );
    })
  );
});
