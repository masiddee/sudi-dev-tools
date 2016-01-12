// THIS WORKS!!!

//var regex = /Mansoor/;
//
//if (regex.test(document.body.innerText)) {
//    chrome.runtime.sendMessage({messageName: 'myMessage'}, function(response_str) {
//        alert(response_str);
//    });
//}


//chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//    console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the esntension");
//    if(request.greeting == 'hello') {
//        sendResponse({farewell: 'goodbye'});
//    }        
//});


// This goes into the panel.js file
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == 'cookies');
    port.onMessage.addListener(function(msg) {
        if(msg.scrape_cookies == 'active') {
            port.postMessage({intro: 'Hello cookies!'});
        }
    });
});



//chrome.cookies.getAll(function(cookies) {
//    for (var i in cookies) {
//        console.log(cookies[i]);
//    }
////});
//
//chrome.runtime.sendMessage({messageName: 'getAllCookies'}, function(cookies) {
//    console.log('World!');
//    for (var i in cookies) {
//        console.log(cookies[i]);
//    }    
//});

// Called from the 'eventPage.js' event
// chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    // console.log('Turning ' + tab.url + ' red!');
    
    // chrome.tabs.executeScript({
       // code: 'document.body.style.backgroundColor="green"'
    // });
// });