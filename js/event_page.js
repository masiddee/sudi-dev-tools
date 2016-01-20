var myMsg;

// Receive message FROM content_script; no message sent back
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    myMsg = sender.tab.id + ': ' + message[1];
    console.log(myMsg);
});

// Open 'port' with devtools.js page
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name !== 'devtools') return;
    
    // Receive 'message' from devtools.js
    port.onMessage.addListener(function(message) {
        console.log(message);
    })
    
    // Send value of 'myMsg' to devtools.
    port.postMessage(myMsg);
});