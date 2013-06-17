//#В js пишешь что-нибудь вроде:
// $(document).on('click', '#nani', function () {
// $('[role="overlay"]').add('[role="popup"].show()');
//                             });

function checkAudio() {
    alert(document.getElementById("speechInput").value);
}

function showPopup() {
	var words = document.getElementById("words")
	var count = words.rows.length
	if (count == 0) return
	
	document.getElementById("overlay").style.visibility = "visible"
	document.getElementById("popup").style.visibility = "visible"
	
	var amount = 0
	for (var i = 0; i < count; i++) {
		amount += parseInt(words.rows[i].cells[1].innerHTML)
	}
}
							 							 
function closePopup() {			
	document.getElementById("overlay").style.visibility = "hidden"
	document.getElementById("popup").style.visibility = "hidden"
}
							 
function checkFile() {	
	showPopup()
}

function getTranslation(row) {
	var index = row.parentNode.parentNode.rowIndex
	var words = document.getElementById("words")
	var tr = words.rows[index].cells[2]
	tr.innerHTML = "перевод"
}

// function moveWord(row) {
// 	
// 	var index = row.parentNode.parentNode.rowIndex;
// 	var words = document.getElementById("words");
// 	var known = document.getElementById("known");
// 	
// 	var upperRow = 1;
// 
// 	if (index > 0) {
// 		
// 		for (var i = 1; i <= index; i++) {
// 			var text = words.getElementsByTagName("tr")[i].cells[2].innerText;
// 			if (words.getElementsByTagName("tr")[i].cells[2].innerText == "tr") {
// 				upperRow = i;
// 				break;
// 			}
// 		}
// 		
// 		for (var i = upperRow; i < index; i++) {
// 
// 			var row = document.createElement("tr");						
// 			var cell1 = document.createElement("td");
// 			var cellText1 = document.createTextNode(words.getElementsByTagName("tr")[upperRow].cells[0].innerText);
// 			cell1.appendChild(cellText1);
// 			var cell2 = document.createElement("td");
// 			var cellText2 = document.createTextNode(words.getElementsByTagName("tr")[upperRow].cells[1].innerText);
// 			cell2.appendChild(cellText2);
// 			
// 			row.appendChild(cell1);
// 			row.appendChild(cell2);
// 			known.appendChild(row);
// 			
// 			words.deleteRow(upperRow);					
// 			
// 		}
// 		
// 		var tr = words.getElementsByTagName("tr")[upperRow].cells[2];
// 		tr.innerHTML = "перевод";
// 	}
// }
