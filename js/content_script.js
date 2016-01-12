// THIS WORKS
//
// This will fire automatically when the www.msiddeeq.com page loads by sending a message to event_page.js
var regex = /Mansoor/;

if (regex.test(document.body.innerText)) {
    chrome.runtime.sendMessage({messageName: 'myMessage'}, function(response_str) {
        alert(response_str);
    });
}


// THIS DOES NOT WORK
// 
// This SHOULD be triggered by the 'btn-primary' button click in panel.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    alert(sender.tab ? 'from a content script: ' + sender.tab.url : 'from the esntension');
    if(request.greeting == 'hello') {
        sendResponse({farewell: 'goodbye'});
    }        
});