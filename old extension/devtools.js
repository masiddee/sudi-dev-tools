chrome.devtools.panels.create(
    "My Panel",
    "MyPanelIcon.png",
    "panel.html",
    function(panel) {
//        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//            alert(message);
//            panelWindow.myFunction(message);
//        });
        var _window;
        var data = [];
        
        // Open a 'port' connection with eventPage.js
        var port = chrome.runtime.connect({name: 'devtools'});
            port.onMessage.addListener(function(myMessage) {
                
                if(_window) {
                    // if the panel window is open, then call myFunction in panel.js
                    _window.myFunction(myMessage);
                }else{
                    // if the panel window is NOT open, then store these values in the data array to be shown later
                    data.push(myMessage);
                }
            });
        
        panel.onShown.addListener(function tmp(panelWindow) {
            panel.onShown.removeListener(tmp); // Makes this only run once
            _window = panelWindow;
            
            
            var myMsg;
            while (myMsg = data.shift()) {
                _window.myFunction(myMsg);
            }
            
            // Create 'respond' method for the panel; can now be called from panel.js
            _window.respond = function(pMsg) {
                // Send value received from panel.js to eventPage.js
                port.postMessage({init: pMsg});
            }
        });
        
//        // Create a port w/ background page for continuous message communication
//        var port = chrome.runtime.connect({name: 'devtools'});
//        
//        // Posting message to background page
//        port.postMessage('From devtools --> background');
//        
//        // Handle response when received from background page
//        port.onMessage.addListener(function(msg) {            
//            alert(msg);
//            
//            // Write information to the panel, if it exists
//            if(_window) {
//                _window.myFunction(msg);
//            }
//        });
//        
//        panel.onShown.addListener(function tmp(panelWindow) {
//            panel.onShown.removeListener(tmp); // Run once only
//            _window = panelWindow;
//            
//            _window.respond = function(msg) {
//                port.postMessage(msg);
//            };
//        });
    }
);
