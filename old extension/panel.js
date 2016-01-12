$('.btn-scrape').on('click', function() {
    // alert('HOMIES!');
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });
    
});

var port = chrome.tabs.connect(tab.id, {name: 'cookies'});
            port.postMessage({scrape_cookies: 'active'});
            port.onMessage.addListener(function(msg) {
                if(msg.intro){
                    alert(msg.intro);
                }else{
                    alert('there was nothing to see');
                }
            });



// MAY WANT TO JUST USE A POPUP EXTENSION RATHER THAN A DEV TOOLS EXTENSION, IN THE INTEREST OF TIME!!!!!!!