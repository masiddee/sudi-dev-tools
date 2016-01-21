var titles = [];

$('h2.title').each(function(index) {
    titles.push($(this).text());
});

// Receive message from background script and return 'titles'
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.scrape == 'yes') {
        sendResponse({domInfo: titles});
    }
});