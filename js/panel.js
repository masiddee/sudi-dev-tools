function myFunction(message) {
    for(i=0; i < message.forms.length; ++i) {
        $('#page-forms').append('<tr><td colspan="2">' + message.forms[i] + '</td></tr>');
    }
    
    for(i=0; i < message.piaid.length; ++i) {
        $('#page-account-id').append('<tr><td colspan="2">' + message.piaid[i] + '</td></tr>');
    }
    
    for(i=0; i < message.picid.length; ++i) {
        $('#page-campaign-id').append('<tr><td colspan="2">' + message.picid[i] + '</td></tr>');
    }
    
    for(i=0; i < message.cookieNames.length; ++i) {
        $('#page-cookies').append('<tr><td>' + message.cookieNames[i] + '</td><td>' + message.cookieValues[i] + '</td></tr>');
    }
    console.log(message);
}

$('.btn-scrape').on('click', function() {
    respond('start_scrape');
});