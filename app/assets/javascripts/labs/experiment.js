function moveBox(x, y) {
	
	var canvas = document.querySelector('canvas');
	var gx = (canvas.width/2 - x)*100/canvas.width;
	var gy = (canvas.height/2 - y)*100/canvas.height;
	
	var box = document.getElementById("box");
	box.style.left = (50 + gx/3) + '%';
	box.style.bottom = (50 + gy/3) + '%';
}

function something() {
	push(1.1);
	// rotate(1.2, 1.2);
}

function rotate(x, y) {
	
	var threedee = document.getElementsByClassName("threedee face");
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

function face() {

    (function() {
		
		stop();
		window.mode = 'face'

        var video = document.createElement('video'),
            content = document.querySelector('.transforming-content'),
            canvas = document.querySelector('canvas'),
            context = canvas.getContext('2d'),
            originalFace,
            gUMOptions = {video: true, audio: true, toString: function(){ return "video"; }};

        video.setAttribute('autoplay', true);
        context.fillStyle = "rgba(0, 0, 200, 0.5)";
        navigator.getUserMedia(gUMOptions, handleWebcamStream, errorStartingStream);

        function handleWebcamStream(stream) {

			localStream = stream;
            video.src = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(stream) : stream;
            processWebcamVideo();
        }

        function errorStartingStream() {
            alert('Uh-oh, the webcam didn\'t start. Do you have a webcam? Did you give it permission? Refresh to try again.');
        }

        function processWebcamVideo() {

            var startTime = +new Date(),
                changed = false,
                scaleFactor = 1,
                faces;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            faces = detectFaces();

                highlightFaces(faces);

                if(originalFace && faces.length > 0) {
                    scaleContent(faces[0]);
                }

                if( ! originalFace && faces.length === 1) {
                    originalFace = faces[0];
                }

            // console.log(+new Date() - startTime);
			var time = document.getElementById("time");
			time.innerHTML = (+new Date() - startTime);			

            // And repeat.
			if (window.mode == 'face') setTimeout(processWebcamVideo, 50);
			else clean();

        }

        function detectFaces() {
            // What do these parameters mean?
            // I couldn't find any documentation, and used what was found here:
            // https://github.com/liuliu/ccv/blob/unstable/js/index.html

            return ccv.detect_objects({canvas : (ccv.pre(canvas)), cascade: cascade, interval: 2, min_neighbors: 1});
        }

        // Draw found faces onto the canvas
        function highlightFaces(faces) {
            if(!faces) {
                return false;
            }

            for (var i = 0; i < faces.length; i++) {
                var face = faces[i];
				// console.log(face.x, face.y, face.width, face.height);
                // context.fillRect(face.x + face.width/2, face.y + face.height/2, 1, 1);
				moveBox(face.x + face.width/2, face.y + face.height/2)
                context.fillRect(face.x, face.y, face.width, face.height);
            }
        }

        function scaleContent(newFace) {
            var scaleFactor = originalFace.height / newFace.height;
            // content.style.setProperty('-o-transform', 'scale('+scaleFactor+')');
            // content.style.setProperty('-webkit-transform', 'scale('+scaleFactor+')');
        }

    })();
}