var myMsg;

// Open 'port' with devtools.js page
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name !== 'devtools') return;
    
    // Receive 'message' from devtools.js
    port.onMessage.addListener(function(message) {
        if(message.init == 'start_scrape'){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                
                chrome.tabs.sendMessage(tabs[0].id, {scrape: 'yes'}, function(response) {
                    
                    chrome.cookies.getAll({"url":tabs[0].url}, function(cookies) {
                        var cookieNames = [];
                        var cookieValues = [];
                        
                        for(var i in cookies){
                            if(cookies[i].name.match(/visitor_id+\d*/g)){
                                //console.log(cookies[i]);
                                cookieNames.push(cookies[i].name);
                                cookieValues.push(cookies[i].value);
                            }
                        }
                        response.domInfo.cookieNames = cookieNames;
                        response.domInfo.cookieValues = cookieValues;
                    });
                    
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

