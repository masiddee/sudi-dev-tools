var titles = [];

$('h2.title').each(function(index) {
    titles.push($(this).text());
});

// Send message TO background script FROM content_script
chrome.runtime.sendMessage(titles);