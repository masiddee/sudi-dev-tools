// THIS WORKS!!
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
    var senderInfo = sender.tab.id;
    
    sendResponse('Hey Mansoor! How are you! Tab ID: ' + senderInfo);
});

chrome.tabs.executeScript(null, {file: "content_script.js"});