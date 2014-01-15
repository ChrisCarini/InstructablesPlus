chrome.extension.sendRequest({method:"getAll"},
function(response)
	 {
		if( ((null == response.showsteps)) )
		{
			alert("Please go to the options page and set your preference!");
			setTimeout(function() {document.location = "chrome://extensions/";}, 1000);
			return;
		}
		
		chrome.extension.sendRequest({method:"setTimesUsed",data: (parseInt(response.timesUsed)+1)}, function(r){console.log(r.msg);});
		
		var loc = (document.location).toString();
		
		if( (loc.substr(0,36) == "http://www.instructables.com/id/edit") ||
			(loc.substr(0,39) == "http://www.instructables.com/id/publish") ||
			(loc.substr(0,39) == "http://www.instructables.com/id/history") ) // We don't want to append ?ALLSTEPS to these urls
		{
			return;
		}
		else
		{
			if( (loc.substr(0,32) == "http://www.instructables.com/id/") && (loc.slice(-9) != "?ALLSTEPS") )  // Instructables Page!!
			{
				setTimeout(function() {document.location = (loc+"?ALLSTEPS");}, 10);
			}
		}
});