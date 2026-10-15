// Guarda el recetario en el teléfono para que abra sin conexión.
// Al publicar cambios, sube el número de VERSION para que todos reciban la nueva versión.
const VERSION = 'sabores-v1';
const CORE = ['./', 'index.html', 'recetas.json', 'portada.jpg', 'retrato.jpg', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const local = url.origin === location.origin;
  // Página y datos: primero la red (para ver correcciones), si no hay conexión, la copia guardada.
  if (local && (req.mode === 'navigate' || url.pathname.endsWith('.json') || url.pathname.endsWith('.html'))) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }
  // Libro, imágenes, tipografías y librerías: primero la copia guardada.
  if (local || /(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; })));
  }
});
