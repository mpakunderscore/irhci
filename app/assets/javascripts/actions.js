//= require_tree ./actions

function showPopup() {	
	document.getElementById("overlay").style.visibility = "visible"
	document.getElementById("popup").style.visibility = "visible"
}
							 							 
function closePopup() {			
	document.getElementById("overlay").style.visibility = "hidden"
	document.getElementById("popup").style.visibility = "hidden"
}