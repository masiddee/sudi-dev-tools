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
        //pageObject.forms = {};
        //pageObject.forms.fields = [];
        //pageObject.forms.fields = {};
        
//        $('form').each(function(index) {
//            console.log(index);
//            if(self == top){
//                pageObject.forms.iframe = false;
//            }else if(parent == top){
//                pageObject.forms.iframe = true;
//            }
//            
//            pageObject.forms.attribute = $(this).attr('action');
//            
//            $('input,textarea,select').each(function(index) {
//                var nameAttr = $(this).attr('name');
//                if(!nameAttr){
//                    console.log('There is no Name attribute for this field');
//                }else{
//                    pageObject.forms.fields.push(nameAttr);
//                    //pageObject.forms.fields.names = nameAttr;
//                }
//            });
//            console.log(pageObject);
//        });

        sendResponse({domInfo: pageObject});
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
        }else{
            //alert('This is not the page you want. You need to be on a Pardot Form Handler page. Try again!');
        }
        
    } // end if message.scrape == fh
});