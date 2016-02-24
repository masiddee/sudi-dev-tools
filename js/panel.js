// This function strictly clears all rows after the th row of each table
function clearPanel(){
    $('#page-forms tr:nth-child(1n+2)').empty();
    $('#page-account-id tr:nth-child(1n+2)').empty();
    $('#page-campaign-id tr:nth-child(1n+2)').empty();
    $('#page-cookies tr:nth-child(1n+2)').empty();
    $('#fh-url').empty();
}

function printInfo(message) {
    
    clearPanel();
    
    if(message.fhInfo){
        $('#fh-url').append('<tr><td><span class="td-title">Unsecure Form Handler URL</span></td><td><span class="fh">' + message.fhInfo.unsecure + '</span>&nbsp;&nbsp;<a href="#" class="edit">Edit Values</a></td></tr>');
        $('#fh-url').append('<tr><td><span class="td-title">Secure Form Handler URL</span></td><td><span class="fh">' + message.fhInfo.secure + '</span>&nbsp;&nbsp;<a href="#" class="edit">Edit Values</a></td></tr>');
    }else{
        for(i=0; i < message.formAction.length; ++i) {
            $('#page-forms').append('<tr><td><span class="td-title">Form Action Attribute:</span></td><td>' + message.formAction[i] + '</td></tr>');
        }

        for(i=0; i < message.piaid.length; ++i) {
            var piaid = String(message.piaid[i]).split("'")[1]; // Extract the AID number 
            var piaidAct = Number(piaid)-1000; // Get the actual Account ID value to append to the URL
            var piaidActLink = '&nbsp;&nbsp;<a href="https://pi.pardot.com?aid=' + piaidAct + '" target="_blank">Account Link</a>'; // Build the Account link
            var piaidMsg = '<tr><td><span class="td-title">Pardot Account ID:</span></td><td>' + piaidAct + piaidActLink + '</td></tr>'
            $('#page-account-id').append(piaidMsg);
        }

        for(i=0; i < message.picid.length; ++i) {
            var picid = String(message.picid[i]).split("'")[1]; // Extract the CID number 
            var picidCampaign = Number(picid)-1000; // Get the actual Campaign ID value to append to the URL
            var picidCampaignLink = '&nbsp;&nbsp;<a href="https://pi.pardot.com/campaign/read/id/' + picidCampaign + '" target="_blank">Campaign Link</a>'; // Build the Campaign link
            var picidMsg = '<tr><td><span class="td-title">Pardot Campaign ID:</span></td><td>' + picidCampaign + picidCampaignLink  + '</td></tr>'
            $('#page-campaign-id').append(picidMsg);
        }

        for(i=0; i < message.cookieNames.length; ++i) {
            var cookieSubstr = String(message.cookieNames[i]).substr(10); // Grabs the Account Id from cookie name and appends it to the URL
            var cookieLink = '<a href="https://pi.pardot.com/visits/index/visitor_id/' + message.cookieValues[i] + '?aid=' + cookieSubstr + '" target="_blank">Visitor Link</a>';
            var removeCookieLink = '<a href="#" class="remove-cookie" data-cookie="' + message.cookieNames[i] + '" data-cookie-url="' + message.cookieUrls[i] + '">Delete this cookie</a>';
            var cookieMsg = '<tr><td><span class="td-title">' + message.cookieNames[i] + '</span></td><td>' + message.cookieValues[i] + '&nbsp;&nbsp;' + cookieLink + '&nbsp;&nbsp;' + removeCookieLink + '</td></tr>'
            $('#page-cookies').append(cookieMsg);
        }
    }
    
}

$('.btn-scrape').on('click', function() {
    respond('start_scrape');
});

$('#page-cookies').on('click', 'a.remove-cookie', function(e) {
    e.preventDefault();
    var linkData = {'cookie':$(this).data('cookie'), 'cookieUrl':$(this).data('cookie-url')};

    respond('del_cookie',linkData);
    $(this).parent().parent().empty();
});

$('.btn-fh').on('click', function() {
    respond('start_fh');
});

$('#fh-url').on('click', '.edit', function(e) {
    e.preventDefault();
    var currentUrl = $(this).siblings('.fh').html();
    $(this).siblings('.fh').replaceWith('<input type="text" value="' + currentUrl + '" class="url-input">');
    $(this).replaceWith('<a href="#" class="update">Update</a>');
});

$('#fh-url').on('click', '.update', function(e) {
    e.preventDefault();
    var newUrl = $(this).siblings('.url-input').val();
    $(this).siblings('.url-input').replaceWith('<span class="fh">' + newUrl + '</span>');
    $(this).replaceWith('<a href="#" class="edit">Edit Values</a>');
});