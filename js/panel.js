function myFunction(message) {
    for(i=0; i < message.forms.length; ++i) {
        $('#page-forms').append('<tr><td><span class="td-title">Form Action Attribute:</span></td><td>' + message.forms[i] + '</td></tr>');
    }
    
    for(i=0; i < message.piaid.length; ++i) {
        var piaid = String(message.piaid[i]).split("'")[1]; // Extract the AID number 
        var piaidAct = Number(piaid)-1000; // Get the actual Account ID value to append to the URL
        var piaidActLink = '&nbsp;&nbsp;<a href="https://pi.pardot.com?aid=' + piaidAct + '" target="_blank">Account Link</a>'; // Build the Account link
        var piaidMsg = '<tr><td><span class="td-title">Pardot Account ID:</span></td><td>' + piaid + piaidActLink + '</td></tr>'
        $('#page-account-id').append(piaidMsg);
    }
    
    for(i=0; i < message.picid.length; ++i) {
        var picid = String(message.picid[i]).split("'")[1]; // Extract the CID number 
        var picidCampaign = Number(picid)-1000; // Get the actual Campaign ID value to append to the URL
        var picidCampaignLink = '&nbsp;&nbsp;<a href="https://pi.pardot.com/campaign/read/id/' + picidCampaign + '" target="_blank">Campaign Link</a>'; // Build the Campaign link
        var picidMsg = '<tr><td><span class="td-title">Pardot Campaign ID:</span></td><td>' + picid + picidCampaignLink  + '</td></tr>'
        $('#page-campaign-id').append(picidMsg);
    }
    
    for(i=0; i < message.cookieNames.length; ++i) {
        var cookieSubstr = String(message.cookieNames[i]).substr(10); // Grabs the Account Id from cookie name and appends it to the URL
        var cookieLinkUrl = 'https://pi.pardot.com/visits/index/visitor_id/' + message.cookieValues[i] + '?aid=' + cookieSubstr;
        var cookieMsg = '<tr><td><span class="td-title">' + message.cookieNames[i] + '</span></td><td>' + message.cookieValues[i] + '&nbsp;&nbsp;<a href="' + cookieLinkUrl + '" target="_blank">Visitor Link</a></td></tr>'
        $('#page-cookies').append(cookieMsg);
    }
}

$('.btn-scrape').on('click', function() {
    respond('start_scrape');
    $(this).addClass('disabled');
});