/* Service worker: salva nel telefono tutte le pagine e le schede, così il sito si apre anche senza connessione.
   Strategia "prima la rete": se sei online vedi sempre l'ultima versione (e la cache si aggiorna da sola),
   se sei offline o la rete non risponde entro 4 secondi si usa la copia salvata.
   Se aggiungi un file (es. una nuova js/schede-<sezione>.js), aggiungilo anche a FILES e aumenta VERSION. */
const VERSION = "schede-v2";
const FILES = [
  "./", "index.html", "manifest.webmanifest", "css/style.css",
  "img/icon.svg", "img/apple-touch-icon.png", "img/app-192.png", "img/app-512.png",
  "js/fonti-corso.js", "js/schede-base.js",
  "js/schede-spalla.js", "js/schede-gomito.js", "js/schede-mano.js", "js/schede-anca.js",
  "js/schede-ginocchio.js", "js/schede-caviglia.js", "js/schede-testa.js", "js/schede-colonna.js",
  "js/schede-muscoli.js", "js/schede-principi.js", "js/app.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function dallaRete(req, chiave){
  return new Promise((ok, ko) => {
    const t = setTimeout(ko, 4000);
    fetch(req).then(r => {
      clearTimeout(t);
      if(r.ok){ const copia = r.clone(); caches.open(VERSION).then(c => c.put(chiave, copia)); }
      ok(r);
    }, err => { clearTimeout(t); ko(err); });
  });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== location.origin) return; // PubMed, DOI: lascia passare
  const chiave = req.mode === "navigate" ? "index.html" : req;
  e.respondWith(dallaRete(req, chiave).catch(() =>
    caches.match(chiave, { ignoreSearch: true }).then(hit => hit || fetch(req))));
});
