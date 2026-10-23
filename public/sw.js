// Service worker do app 30praum.
// Páginas: rede primeiro, com a última versão em cache se cair a conexão.
// Arquivos estáticos (JS, CSS, fontes, imagens): cache primeiro.
// Admin, API, carrinho e checkout nunca passam pelo cache.

const VERSION = "v1";
const STATIC_CACHE = `30praum-static-${VERSION}`;
const PAGES_CACHE = `30praum-pages-${VERSION}`;
const OFFLINE_URL = "/offline.html";
const PRECACHE = [OFFLINE_URL, "/icons/icon-192.png", "/icons/icon-512.png"];

const NEVER_CACHE = ["/admin", "/api", "/cart", "/checkout-redirect"];
const MAX_PAGES = 40;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("30praum-") && !key.endsWith(VERSION))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    /\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|otf)$/i.test(url.pathname)
  );
}

async function trimCache(name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function networkFirstPage(request) {
  try {
    const response = await fetch(request);
    if (response.ok && response.type === "basic") {
      const cache = await caches.open(PAGES_CACHE);
      cache.put(request, response.clone()).then(() => trimCache(PAGES_CACHE, MAX_PAGES));
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached ?? (await caches.match(OFFLINE_URL));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (NEVER_CACHE.some((p) => url.pathname === p || url.pathname.startsWith(`${p}/`))) return;
  // Navegação do App Router (RSC) fica com o Next.
  if (request.headers.get("RSC") || url.searchParams.has("_rsc")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
  }
});
