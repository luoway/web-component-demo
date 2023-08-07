console.log('service worker loaded', self, globalThis)

self.addEventListener('install', event => {
    event.waitUntil(new Promise((resolve)=>{
        console.info('安装完成', self.clients)
        setTimeout(resolve, 1000)
    }))
})

self.addEventListener('activate', (event) => {
    event.waitUntil(new Promise((resolve)=>{
        console.info('激活完成', event)
        setTimeout(resolve, 1000)
    }))
})