function myFunction(message) {
    for(i=0; i < message.length; ++i) {
        $('#example').append('<li>' + message[i] + '</li>');
    }
}

$('.btn-scrape').on('click', function() {
    respond('start_scrape');
});