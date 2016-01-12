// THIS WORKS!!
//chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
//    var senderInfo = sender.tab.id;
//    
//    sendResponse('Hey Mansoor! How are you!' + senderInfo);
//});


// chrome.tabs.executeScript(null, {file: "content_script.js"});




//chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//    if(message.messageName === 'getAllCookies') {
//        chrome.cookies.getAll({name: 'visitor_id22392'}, function(cookies) {
//            
//            for (var i in cookies) {
//                console.log(cookies[i]);
//            }
//            
//            // sendResponse(cookies);
//        });
//    }
//});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // chrome.tabs.executeScript(null, {file: "content_script.js"});
    
//    chrome.cookies.getAll({name: 'visitor_id22392'}, function(cookies) {
//        for (var i in cookies) {
//            console.log(cookies[i]);
//        }
//    });
    
});