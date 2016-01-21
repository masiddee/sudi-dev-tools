function myFunction(message) {
    //alert(message);
    //var splitMsg = message.split(',');
    //alert(message.length);
    for(i=0; i < message.length; ++i) {
        $('#example').append('<li>' + message[i] + '</li>');
    }
}

$('.btn-scrape').on('click', function() {
    respond('start_scrape');
});

// Receive a message from devtools.js via function call
//function myFunction(msg) {
//    alert(msg + 'Received msg from devtools --> panel.js');
//    document.body.textContent += '\n' + msg;
//}
//
//$('.btn-scrape').on('click', function(msg) {
//    // Sending a value to the respond method in devtools.js
//    respond('My Message');
//    document.body.textContent += '\n' + 'My Message';
//})


//$('.btn-scrape').on('click', function() {
//    // alert('HOMIES!');
//    
//    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//            console.log(response.farewell);
//        });
//    });
//    
//});
//
//var port = chrome.tabs.connect(tab.id, {name: 'cookies'});
//            port.postMessage({scrape_cookies: 'active'});
//            port.onMessage.addListener(function(msg) {
//                if(msg.intro){
//                    alert(msg.intro);
//                }else{
//                    alert('there was nothing to see');
//                }
//            });
//
//
//
//// MAY WANT TO JUST USE A POPUP EXTENSION RATHER THAN A DEV TOOLS EXTENSION, IN THE INTEREST OF TIME!!!!!!!