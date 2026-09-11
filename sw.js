// Minimal service worker: just enough to satisfy PWA installability
// and cache the shell (icon, manifest, wrapper page) for offline loading.
// The Streamlit dashboard itself (inside the iframe) still needs internet.

const CACHE_NAME = "swine-farm-shell-v1";
const SHELL_FILES = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle shell-file requests; let the iframe's own requests
  // (the live Streamlit app) go straight to the network.
  const isShellFile = SHELL_FILES.some((f) => event.request.url.endsWith(f.replace("./", "")));
  if (isShellFile) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});
