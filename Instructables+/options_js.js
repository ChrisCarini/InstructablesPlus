function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

// Saves options to localStorage.
function save_options()
{
	var status = document.getElementById("status");	
	if(localStorage["showsteps"] != getCheckedValue(document.getElementsByName("showsteps")))
	{
		localStorage["showsteps"] = getCheckedValue(document.getElementsByName("showsteps"));
		status.className = "statusGood";
		status.innerHTML = "Show Steps Updated...";
	}
	else
	{
		status.className = "status";
		status.innerHTML = "Nothing Needed To Be Changed...";
	}
	setTimeout(function() {status.innerHTML = "";}, 2000);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	if (!localStorage.getItem("timesUsed"))
	{
		localStorage.setItem("timesUsed", 0);
	}
	if (!localStorage.getItem("startDate"))
	{
		var date = (new Date()).toLocaleDateString();
		localStorage.setItem("startDate", (date));//.substring(date.search(",")+2) );
	}
	if(localStorage["timesUsed"] && localStorage["startDate"])
	{
		document.getElementById("timesUsed").innerHTML = "Used a total of "+localStorage["timesUsed"]+" times since "+localStorage["startDate"]+".";
	}
	else
	{
		document.getElementById("timesUsed").innerHTML = "You have not used the extension yet...";
	}
	if(!localStorage["showsteps"])
	{
		localStorage["showsteps"] == "Yes"
	}

	if(localStorage["showsteps"] == "Yes")
	{
		document.getElementsByName("showsteps")[0].checked = true;
	}
	else
	{
		document.getElementsByName("showsteps")[1].checked = true;
	}
}

document.addEventListener('DOMContentLoaded', function () {
  restore_options();
  document.querySelectorAll('button')[0].addEventListener('click', save_options);
});