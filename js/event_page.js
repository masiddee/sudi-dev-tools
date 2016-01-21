var myMsg;

// Open 'port' with devtools.js page
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name !== 'devtools') return;
    
    // Receive 'message' from devtools.js
    port.onMessage.addListener(function(message) {
        if(message.init == 'start_scrape'){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {scrape: 'yes'}, function(response) {
                    myMsg = response.domInfo;
                    
                    // Send value of 'myMsg' to devtools.
                    port.postMessage(myMsg);
                });
            });
        }else{
            console.log('this is not the message you are looking for');
        }
    });
});