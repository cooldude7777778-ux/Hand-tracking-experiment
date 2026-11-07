const C='handlink-v1',S=['./','./index.html','./manifest.webmanifest','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(S)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
// cache-first + runtime caching (Three.js, MediaPipe wasm/model → работает офлайн после первого запуска)
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type=='opaque'){const k=n.clone();caches.open(C).then(c=>c.put(e.request,k))}return n}).catch(()=>caches.match('./index.html'))))});
