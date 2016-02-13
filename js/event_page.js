var myMsg;

// Open 'port' with devtools.js page
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name !== 'devtools') return;
    
    // Receive 'message' from devtools.js
    port.onMessage.addListener(function(message) {
        if(message.init == 'start_scrape'){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                
                chrome.tabs.sendMessage(tabs[0].id, {scrape: 'page'}, function(response) {
                    
                    chrome.cookies.getAll({"url":tabs[0].url}, function(cookies) {
                        var cookieNames = [];
                        var cookieValues = [];
                        var cookieUrls = [];
                        var cookieUrl;
                        
                        for(var i in cookies){
                            if(cookies[i].name.match(/visitor_id+\d*/g)){
                                cookieNames.push(cookies[i].name);
                                cookieValues.push(cookies[i].value);
                                
                                // Check cookies.domain and build URLs
                                if(cookies[i].domain == '.pardot.com'){
                                    cookieUrl = 'https://go' + cookies[i].domain + cookies[i].path;
                                }else{
                                    cookieUrl = 'http' + (cookies[i].secure ? 's' : '') + '://' + cookies[i].domain + cookies[i].path;
                                }
                                // Push the fully formed URLs to the cookieUrls array
                                cookieUrls.push(cookieUrl);
                            }
                        }
                        response.domInfo.cookieNames = cookieNames;
                        response.domInfo.cookieValues = cookieValues;
                        response.domInfo.cookieUrls = cookieUrls;
                        
                        myMsg = response.domInfo;

                        // Send value of 'myMsg' to devtools.
                        port.postMessage(myMsg);
                    });
                });
            });
            
        }else if(message.init == 'start_fh'){
            
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {scrape: 'fh'}, function(response) {
                    
                });
            });
            
        }else if(message.init == 'del_cookie'){
            
            var cookieName = message.body.cookie;
            var cookieUrl = message.body.cookieUrl;
            
            chrome.cookies.getAll({'name':cookieName}, function(cookiesDel) {
                chrome.cookies.remove({'url':cookieUrl, 'name':cookieName});
            });
            
        }else{
            console.log('this is not the message you are looking for');
        }
    });
});

