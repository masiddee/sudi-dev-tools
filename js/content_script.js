// Receive message from background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.scrape == 'page') {
        
        var tabUrl = window.location.href;
        
        if(tabUrl.substr(0,22) != 'https://pi.pardot.com/'){
            // Grab all of the javascript loaded in the page itself, and store it here
            var pageScript;
            $('script').each(function(){
                if(self == top){
                    var data = $(this).text();
                    pageScript += data;
                }
            });

            var pageFormAction = [];
            var pageFormFields = [];
            var pageFormIframe = [];
            $('form').each(function(index) {

                if(window.top != window){
                    pageFormAction.push($(this).attr('action'));
                    pageFormIframe.push(true);

                    $('input,textarea,select').each(function() {
                        pageFormFields.push($(this).attr('name'));
                    });
                }else{
                    pageFormAction.push($(this).attr('action'));
                    pageFormIframe.push(false);

                    $('input,textarea,select').each(function() {
                        pageFormFields.push($(this).attr('name'));
                    });
                }
            });

            // Will store all information scraped from the page
            var pageObject = {};
            // Regex through the pageScript; store piAId values
            pageObject.piaid = pageScript.match(/piAId\s=\s.(\d+).;|piAId\s=.(\d+).;|piAId=.(\d+).;/g);
            // Regex through the pageScript; store piCId values
            pageObject.picid = pageScript.match(/piCId\s=\s.(\d+).;|piCId\s=.(\d+).;|piCId=.(\d+).;/g);

            // Append pageForm arrays
            pageObject.formAction = pageFormAction;
            pageObject.formFields = pageFormFields;
            pageObject.formIframe = pageFormIframe;

            sendResponse({domInfo: pageObject});
        } // end if tabUrl
    } // end if message.scrape == page
    
    
    if(message.scrape == 'fh') {
        
        var tabUrl = window.location.href;
        
        // Take the form handler keys scraped from the page and build a query string
        function buildQueryString(names) {
            var queryString = '?';
            while(names.length){
                queryString += names.shift();
                queryString += '=VALUE&';
            }
            return queryString;
        }
        
        if(tabUrl.substr(0,42) == 'https://pi.pardot.com/formHandler/read/id/'){
            
            var httpEndpointUrl = $('.http-endpoint').html().trim();
            var httpsEndpointUrl = $('.https-endpoint').html().trim();
            
            var fhKeys = [];
            
            $("tr[id*=foh_row]").each(function(index) {
                fhKeys.push($(this).children('.key').html());
            });
            
            var compiledQueryString = buildQueryString(fhKeys);
            
            var fullFormHandler = {
                'unsecure': httpEndpointUrl + compiledQueryString,
                'secure': httpsEndpointUrl + compiledQueryString
            }
            
            sendResponse({fhInfo: fullFormHandler});
        }        
    } // end if message.scrape == fh
});