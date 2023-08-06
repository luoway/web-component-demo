console.log('worker.js', self, globalThis, self === globalThis);

onmessage = (e) => {
    console.log("Message received from main script", e);
    if(e.data.includes('error')) {
        throw new Error('Worker Error');
    }
    postMessage("Posting message back to main script");
};

onerror = (e) => {
    console.log("error in worker:", e);
}

const sharedWorker = new SharedWorker("workerShared.js")
sharedWorker.port.start()
sharedWorker.port.onmessage = (e) => {
    console.log("worker收到SharedWorker发来的消息：", e.data);
}
function postToSharedWorker(){
    sharedWorker.port.postMessage("Hello shared worker. I'm worker, too.");
}
postToSharedWorker()