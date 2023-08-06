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

const subWorker = new Worker("sub-worker.js")
subWorker.addEventListener("message", (e) => {
    console.log('Message received from sub worker',e)
})
subWorker.postMessage("I'm parent");