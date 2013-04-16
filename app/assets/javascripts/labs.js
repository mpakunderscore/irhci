//#В js пишешь что-нибудь вроде:
// $(document).on('click', '#nani', function () {
// $('[role="overlay"]').add('[role="popup"].show()');
//                             });
function showPopup() {
	document.getElementById("overlay").style.visibility = "visible";
	document.getElementById("popup").style.visibility = "visible";
}
							 							 
function closePopup() {			
	document.getElementById("overlay").style.visibility = "hidden";
	document.getElementById("popup").style.visibility = "hidden";
}
							 
function checkFile() {
	
	showPopup();
}

function moveWord(row)
{
	var index = row.parentNode.parentNode.rowIndex;
	if (index > 0) {
		for (var i = 1; i < index; i++) {
			// var word = document.getElementById("words")[1].getElementsByTagName("td")[0];
			// var count = document.getElementById("words")[1].getElementsByTagName("td")[1];
			document.getElementById("words").deleteRow(1);					
			// var table_known = document.getElementById("known");			
	// 		var row = table_known.insertRow(1);
	// 	    var wordCell  = row.insertCell(0);
	// 	    var countCell  = row.insertCell(1);
	// 
	// 	    wordCell.appendChild('word');				
	// 		countCell.appendChild('10');				
		}
	}
}
