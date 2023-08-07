console.log('service worker loaded', self, globalThis)

self.addEventListener('install', event => {
    event.waitUntil(new Promise((resolve)=>{
        console.log('安装回调', event, self.clients)
        setTimeout(resolve, 1000)
    }))
})

self.addEventListener('activate', (event) => {
    event.waitUntil(new Promise((resolve)=>{
        console.log('激活回调', event, self.clients)
        setTimeout(resolve, 1000)
    }))
})