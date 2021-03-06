chrome.devtools.panels.create(
    "Sudi Developer Panel",
    "MyPanelIcon.png",
    "panel.html",
    function(panel) {
        var _window; // Going to hold the reference to panel.html's 'window'
        var data = [];

        // Open a 'port' connection with eventPage.js
        var port = chrome.runtime.connect({name : 'devtools'});
            port.onMessage.addListener(function(myMessage) {
                if(_window) {
                    // if the panel window is open, then call printInfo in panel.js
                    _window.printInfo(myMessage);
                }else{
                    // if the panel window is NOT open, then store these values in the 'data' array to be shown later
                    data.push(myMessage);
                }
            });
        
        panel.onShown.addListener(function(panelWindow) {
            //panel.onShown.removeListener(tmp); // Makes this only run once
            _window = panelWindow;
            
            var myMsg;
            while(myMsg = data.shift()) {
                _window.printInfo(myMsg);
            }
            
            // Create 'respond' method for the panel; can now be called from panel.js
            _window.respond = function(msgTitle, msgBody) {
                // Send value received from panel.js to eventPage.js
                port.postMessage({init: msgTitle, body: msgBody});
            }
        });
    }
);