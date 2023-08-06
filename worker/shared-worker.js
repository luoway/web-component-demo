onconnect = function (e) {
    var port = e.ports[0];
  
    port.addEventListener("message", function (e) {
        console.log(e)
        port.postMessage(`I'm shared worker`);
    });
  
    port.start(); // Required when using addEventListener.
}