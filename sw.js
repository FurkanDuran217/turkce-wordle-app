// Eski adresteki PWA'nın service worker'ının yerine geçer: yüklenir yüklenmez kendini
// kaldırır, önbelleği siler ve açık sekmeleri yeniler. Yenilenen sekme yönlendirme
// sayfasını (index.html) alır ve oyuncu kayıtlarıyla birlikte yeni adrese gider.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.registration.unregister()
      for (const key of await caches.keys()) await caches.delete(key)
      for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url)
    })(),
  )
})
