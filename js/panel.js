function myFunction(message) {
    for(i=0; i < message.forms.length; ++i) {
        $('#page-forms').append('<tr><td colspan="2">' + message.forms[i] + '</td></tr>');
    }
    
    for(i=0; i < message.piaid.length; ++i) {
        var piaid = String(message.piaid[i]).split("'")[1];
        $('#page-account-id').append('<tr><td colspan="2">' + piaid + '</td></tr>');
    }
    
    for(i=0; i < message.picid.length; ++i) {
        var picid = String(message.picid[i]).split("'")[1];
        $('#page-campaign-id').append('<tr><td colspan="2">' + picid + '</td></tr>');
    }
    
    for(i=0; i < message.cookieNames.length; ++i) {
        $('#page-cookies').append('<tr><td>' + message.cookieNames[i] + '</td><td>' + message.cookieValues[i] + '</td></tr>');
    }
    console.log(message);
}

$('.btn-scrape').on('click', function() {
    respond('start_scrape');
});