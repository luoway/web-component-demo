console.log('service worker loaded', self, globalThis)

self.addEventListener('install', event => {
    event.waitUntil(new Promise((resolve, reject)=>{
        console.log('安装回调', event, self.clients)
        // reject() //让安装失败进入redundant
        setTimeout(resolve, 1000)
    }))
})

self.addEventListener('activate', (event) => {
    event.waitUntil(new Promise((resolve, reject)=>{
        console.log('激活回调', event, self.clients)
        // reject() //无论Promise什么状态，都会进入activated
        setTimeout(resolve, 1000)
    }))
})