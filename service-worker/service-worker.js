console.log('service worker loaded', self, globalThis)

self.addEventListener('install', event => {
    event.waitUntil(new Promise(()=>{
        console.info('安装完成', self.clients)
    }))
    event.waitUntil(
        self.clients.matchAll().then ( (client) => {
            console.log(11, '行: client', client)
            
            client.postMessage({
                msg: 'Hey, from service worker! I\'m listening to your fetch requests.',
                source: 'service-worker'
            })
        })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(new Promise(()=>{
        console.info('激活完成')
    }))
    event.waitUntil(
        self.clients.matchAll().then ( (client) => {
            console.log(11, '行: client', client)
            
            client.postMessage({
                msg: 'Hey, from service worker! I\'m listening to your fetch requests.',
                source: 'service-worker'
            })
        })
    )
})