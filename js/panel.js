// THIS DOES NOT WORK
// 
// This SHOULD open a message with content_script and receive 'goodbye'
$('.btn-primary').on('click', function() {
    alert('HELLO WORLD');
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: 'hello'}, function(response) {
            alert(response.farewell);
        });
    });
});