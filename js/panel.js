function myFunction(message) {
    for(i=0; i < message.forms.length; ++i) {
        $('#page-forms').append('<tr><td>' + message.forms[i] + '</td></tr>');
    }
    
    for(i=0; i < message.piaid.length; ++i) {
        $('#page-account-id').append('<tr><td>' + message.piaid[i] + '</td></tr>');
    }
    
    for(i=0; i < message.picid.length; ++i) {
        $('#page-campaign-id').append('<tr><td>' + message.picid[i] + '</td></tr>');
    }
}

$('.btn-scrape').on('click', function() {
    respond('start_scrape');
});