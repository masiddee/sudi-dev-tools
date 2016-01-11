chrome.devtools.panels.create(
    "My Panel",
    "MyPanelIcon.png",
    "panel.html",
    function(panel) {
        
        var runOnce = false;
        panel.onShown.addListener(function(panelWindow) {
            // if (runOnce) return;
            // runOnce = true;
            // panelWindow.document.body.appendChild(document.createTextNode('Hello!'));
    
            // chrome.devtools.inspectedWindow.eval('console.log("test")') // use this to debug output
            
            
        });
        
        
    }
);
