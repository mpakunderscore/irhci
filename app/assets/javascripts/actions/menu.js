function login() {
	closeLogin()	
}	

function showAdd() {	
	document.getElementById("overlay").style.visibility = "visible"
	document.getElementById("add").style.visibility = "visible"
}
							 							 
function closeAdd() {			
	document.getElementById("overlay").style.visibility = "hidden"
	document.getElementById("add").style.visibility = "hidden"
}

function showLogin() {	
	document.getElementById("overlay").style.visibility = "visible"
	document.getElementById("login").style.visibility = "visible"
}
							 							 
function closeLogin() {			
	document.getElementById("overlay").style.visibility = "hidden"
	document.getElementById("login").style.visibility = "hidden"
}

