self.addEventListener('install', event=>{
    self.skipWaiting()
})

self.addEventListener('message', event=>{
    if(event.data === 'notify'){
        if(Notification.permission === 'granted') {
            self.registration.showNotification('您有新的消息', {
                body: '快打开看看',
                actions: [
                    { action: 'open', title: '打开' },
                    { action: 'close', title: '关闭' },
                ],
            })
        }
    }
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    if (event.action === 'close') return

    event.waitUntil(
        clients
            .matchAll({
                type: 'window',
            })
            .then((clientList) => {
                for (const client of clientList) {
                    // 激活页面
                    if ('focus' in client) return client.focus()
                }
                // 打开页面
                if (clients.openWindow)
                    return clients.openWindow(
                        self.registration.scope + 'notification.html'
                    )
            })
    )
})

let timer = null
self.addEventListener('notificationclose', event=>{
    if(timer) return
    timer = setTimeout(()=>{
        timer = null
    }, 5000)

    setTimeout(()=>{
        self.registration.showNotification('您关闭了通知', {
            body: '不好意思打扰了。所有通知4s后自动关闭',
        }).then(()=>{
            self.registration.getNotifications({tag: 'close'}).then(list=>{
                setTimeout(()=>list.forEach(item=>item.close()), 4000)
            })
        })
    }, 300)
})
