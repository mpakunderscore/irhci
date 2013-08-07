//normalize window.URL
window.URL || (window.URL = window.webkitURL || window.msURL || window.oURL);

//normalize navigator.getUserMedia
navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

window.mode = '';
window.disclosure = 1;

var localStream;

function stop() {
	window.mode = '';
	// document.getElementById("stop").css('');
}

function clean() {
	
	var canvas = document.querySelector('canvas');
	var	context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);	
	
	var time = document.getElementById("time");
	time.innerHTML = ("");
	
	localStream.stop()
}

function face() {

    (function() {
		
		stop();
		window.mode = 'face'

        var video = document.createElement('video'),
            content = document.querySelector('.transforming-content'),
            canvas = document.querySelector('canvas'),
            context = canvas.getContext('2d'),
            // context = canvas.getContext('2d'),
            originalFace,
            gUMOptions = {video: true, audio: false, toString: function(){ return "video"; }};

        video.setAttribute('autoplay', true);
        context.fillStyle = "rgba(255, 255, 255, 0.5)";
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
			// time.innerHTML = (+new Date() - startTime);			

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
				// moveBox(face.x + face.width/2, face.y + face.height/2)
                context.fillRect(face.x, face.y, face.width, face.height*0.7);
				// var imgData = ctx.getImageData(face.x, face.y, face.width, face.height*0.7);
				stop()
            }
        }

        function scaleContent(newFace) {
            var scaleFactor = originalFace.height / newFace.height;
            // content.style.setProperty('-o-transform', 'scale('+scaleFactor+')');
            // content.style.setProperty('-webkit-transform', 'scale('+scaleFactor+')');
        }

    })();
}