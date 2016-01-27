// Create a new tab with msiddeeq.com URL
//chrome.tabs.create({url: 'http://www.msiddeeq.com'}, function(data) {
//    if(data.url) {
//        console.log(data.pinned);
//    }
//});


// Receive message FROM content_script; no message sent back
//chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//    myMsg = sender.tab.id + ': ' + message[1];
//    console.log(myMsg);
//});



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
                    console.log(myMsg);
                    
                    // Send value of 'myMsg' to devtools.
                    port.postMessage(myMsg);
                });
            });
        }else{
            console.log('this is not the message you are looking for');
        }
    });
});



// Handle request from devtools
//chrome.runtime.onConnect.addListener(function(port) {
//    // If the port connection is not 'devtools' then exit
//    if(port.name !== 'devtools') return;
//    
//    port.onMessage.addListener(function(message) {
//        // Request a tab for sending needed information
//        alert(message);
//        chrome.tabs.query({
//            'status': 'complete',
//            'currentWindow': true
//        }, function(tabs) {
//            for(tab in tabs) {
//                // Sending Message to content_scripts
//                chrome.tabs.sendMessage(tabs[tab].id, message);
//            }
//        });
//    });
//    
//    // Posting back to devtools
//    chrome.runtime.onMessage.addListener(function(message, sender) {
//        if(message.name == 'regex_return') {
//            // port.postMessage(message);
//            port.postMessage(message + '& From background --> devtools');
//        }
//        
//    });
//});








//var ports = [];
//
//chrome.runtime.onConnect.addListener(function(port) {
//    if(port.name !== 'devtools') return;
//    ports.push(port);
//    
//    port.onDisconnect.addListener(function() {
//        var i = ports.indexOf(port);
//        if(i !== -1) ports.splice(i,1);
//    });
//    
//    port.onMessage.addListener(function(msg) {
//        console.log('Received message from devtools page', msg);
//    });
//});
//
//function notifyDevtools(msg) {
//    ports.forEach(function(port) {
//        port.postMessage(msg);
//    });
//}

//var tabPort = chrome.tabs.connect(tab.id, {name: 'test'});
//tabPort.postMessage({scrape_cookies: 'active'});
//tabPort.onMessage.addListener(function(msg) {
//    if(msg.intro){
//        alert(msg.intro);
//    }else{
//        alert('NOTHING');
//    }
//});



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
// chrome.browserAction.onClicked.addListener(function(tab) {
    // chrome.tabs.executeScript(null, {file: "content_script.js"});
    
//    chrome.cookies.getAll({name: 'visitor_id22392'}, function(cookies) {
//        for (var i in cookies) {
//            console.log(cookies[i]);
//        }
//    });
    
// });