onmessage = (e) => {
    console.log("Message received from parent", e);
    if(e.data.includes('error')) {
        throw new Error('Sub Worker Error');
    }
    postMessage("Posting message back to parent");
};

onerror = (e) => {
    console.log("error in sub worker:", e);
}