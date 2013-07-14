//= require_tree ./labs

function show_input() {	
	if (document.getElementById("voice").style.visibility != "visible")
		document.getElementById("voice").style.visibility = "visible"
	else 
		document.getElementById("voice").style.visibility = "hidden"
}

if (document.createElement("input").webkitSpeech === undefined) {
	alert("Speech input is not supported in your browser.");
}