// Receive message from background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.scrape == 'page') {

        // Grab all of the javascript loaded in the page itself, and store it here
        var pageScript;
        $('script').each(function(){
            if(self == top){
                var data = $(this).text();
                pageScript += data;
            }
        });

        var pageFormAction = [];
        $('form').each(function(index) {
            if(self == top){
                pageFormAction.push($(this).attr('action'));
            }else if(parent == top){
                //console.log($(this) + ' is inside of an iframe');
            }
        });

        // Will store all information scraped from the page
        var pageObject = {};
            // Regex through the pageScript; store piAId values
            pageObject.piaid = pageScript.match(/piAId\s=\s.(\d+).;|piAId\s=.(\d+).;|piAId=.(\d+).;/g);
            // Regex through the pageScript; store piCId values
            pageObject.picid = pageScript.match(/piCId\s=\s.(\d+).;|piCId\s=.(\d+).;|piCId=.(\d+).;/g);
            // Append pageForms
            pageObject.forms = pageFormAction;

        sendResponse({domInfo: pageObject});
    } // end if message.scrape == page
    
    
    if(message.scrape == 'fh') {
        
        var tabUrl = window.location.href;
        alert(tabUrl.substr(0,41));
        if(tabUrl.substr(0,41) == 'https://pi.pardot.com/formHandler/read/id/'){
            alert('this is the page you want');
        }else{
            alert('This is not the Page');
        }
        
    } // end if message.scrape == fh
});