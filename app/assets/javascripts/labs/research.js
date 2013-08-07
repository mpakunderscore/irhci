// Normalize getUserMedia and URL
// https://gist.github.com/f2ac64ed7fc467ccdfe3

function moveBox(x, y) {
	
	var canvas = document.querySelector('canvas');
	var gx = (canvas.width/2 - x)*100/canvas.width;
	var gy = (canvas.height/2 - y)*100/canvas.height;
	
	var box = document.getElementById("box");
	box.style.left = (50 + gx/3) + '%';
	box.style.bottom = (50 + gy/3) + '%';
}

function some() {
	// push(1.1);
	rotate(1.2, 1.2);
}

function rotate(x, y) {
	
	var threedee = document.getElementsByClassName("threedee");
	for (var i = 0; i < threedee.length; i++) {
		
		var old = threedee[i].style.webkitTransform.split('(');
		var coor = [];

		old[1] = "(" + old[1];

		var ol = old[2].split(')')[0];
		coor[0] = ol.substring(0, ol.length - 3)*x;
		old[2] = "(" + coor[0] + "rad)" + old[2].split(')')[1];
		
		var ol = old[3].split(')')[0];
		coor[1] = ol.substring(0, ol.length - 3)*y;		
		old[3] = "(" + coor[1] + "rad)" + old[3].split(')')[1];
		
		var ol = old[4].split(')')[0];
		coor[2] = ol.substring(0, ol.length - 3)*y;		
		old[4] = "(" + coor[1] + "rad)" + old[4].split(')')[1];		
		
		var new_t = "";
		for (var j = 0; j < old.length; j++) {
			new_t += old[j];
		}
		
		// new_t = new_t.substring(0, new_t.length - 1)
		
		threedee[i].style.webkitTransform = new_t;
		
		console.log(i + ": " + new_t);
	}
	
}


function push(x) {
	
	var threedee = document.getElementsByClassName("threedee face");
	for (var i = 0; i < threedee.length; i++) {
		
		var old = threedee[i].style.webkitTransform.split(')');
		var coor =  old[0].split('(')[1].split(',');
					
		for (var j = 0; j < coor.length; j++) {
			coor[j] = coor[j].substring(0, coor[j].length - 2)*x;
		}
		
		old[0] =  "translate3d("+coor[0]+"px, "+coor[1]+"px, "+coor[2]+"px";
		
		var new_t = "";
		for (var j = 0; j < old.length; j++) {
			new_t += old[j] + ")";
		}
		
		new_t = new_t.substring(0, new_t.length - 1)
		
		threedee[i].style.webkitTransform = new_t;
		
		console.log(i + ": " + new_t);
	}
	
	
}

function make_box() {
	var box = document.getElementById("box");
	// if (box != null) 
	box.appendChild(createBarrel(1, 's'));	
	box.appendChild(createBarrel(2.5, 'm')); //Math.floor((Math.random()*5)+1)
	// box.appendChild(createBarrel(3));
	box.appendChild(createBarrel(4, 'b'));
}

function spin_round() {
	// var box = document.getElementsByClassName("threedee assembly")[0];
	// box.style.webkitTransform = 'rotate(40deg)';
	var box_s = document.getElementById('s');
	box_s.style.setProperty('animation', 'spin 5s linear infinite');
	
}