chrome.devtools.panels.create(
    "Sudi Developer Panel",
    "MyPanelIcon.png",
    "panel.html",
    function(panel) {
        panel.onShown.addListener(function(panelWindow) {
            // Nothing here yet
        });
    }
);