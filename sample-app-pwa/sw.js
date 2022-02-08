const nameApp = "my-pwa-app";

const fileToCache = [
     '/',
     'page1.html',
     'page2.html',
     'sw.js',
     'manifest.json',
     'images/Golden-Katana-Sword.jpg',
     'images/cs-88bck-cold-steel-warrior-chisa-katana-bg_black.jpg',
     'images/offline.png'

]

if('serviceWorker' in navigator){
     navigator.serviceWorker.register('sw.js')
}

self.addEventListener('install', function(event) { 
     event.waitUntil(
          caches.open(nameApp).then((cache) => {
               return cache.addAll(fileToCache)
          })
     )
})

self.addEventListener('activate', function(event){ 
     console.log("browser activate")
})
 
self.addEventListener('fetch', function(event){
     event.respondWith(
          caches.match(event.request).then(function(response){
               return response || fetch(event.request)
          }).catch(function(err){
               return caches.match('./images/offline.png')
          })
     )
})