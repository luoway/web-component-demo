
let version = Date.now().toString()

self.addEventListener('install', event => {
    self.skipWaiting()
    // 开始预取并缓存
    event.waitUntil(
        caches.open(version).then(cache => cache.add('sample.json'))
    )
})

self.addEventListener('activate', (event) => {
    // 清除旧的缓存
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if(key != version){
                    return caches.delete(key)
                }
                return Promise.resolve()
            })
        ))
    )
})

self.addEventListener('fetch', (event) => {
    console.log('service worker fetch: ', event.request.url);

    if(event.request.url.includes('sample.json')) {
        event.respondWith(
            caches.open(version).then(cache => {
                //使用预取的缓存
                return cache.match(event.request.url).then(response => {
                    return response || fetch(event.request)
                })
            })
        )
    }
    else if(event.request.url.includes('empty.json')){
        event.respondWith(
            fetch(event.request).then(response => {
                return response.json()
            }).then(data => {
                data.content = 'empty.json'
                data.from = 'service worker'
                return new Response(JSON.stringify(data))
            })
        )
    }
    else if(event.request.url.includes('fake.json')){
        event.respondWith(
            new Response(JSON.stringify({
                content: 'fake.json',
                from: 'service worker',
            }))
        )
    }
})