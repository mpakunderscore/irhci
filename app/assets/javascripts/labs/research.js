// Normalize getUserMedia and URL
// https://gist.github.com/f2ac64ed7fc467ccdfe3

//normalize window.URL
window.URL || (window.URL = window.webkitURL || window.msURL || window.oURL);

//normalize navigator.getUserMedia
navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

// if (typeof navigator.getUserMedia === "function") {
function border() {
		

}
function color() {

    (function() {	
		
        var video = document.createElement('video'),
            canvas = document.querySelector('canvas'),
            context = canvas.getContext('2d'),
            originalFace,
            gUMOptions = {video: true, toString: function(){ return "video"; }};

		var colors = new Array(canvas.width*canvas.height*3);
		video.setAttribute('autoplay', true);

        context.fillStyle = "rgba(0, 0, 200, 0.5)";
        navigator.getUserMedia(gUMOptions, handleWebcamStream, errorStartingStream);

        function handleWebcamStream(stream) {

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
			var imgd = context.getImageData(0, 0, canvas.width, canvas.height);
			var pix = imgd.data;

			var k = 25;
			var a = 0;
			var j = 0;

			for (var i = 0, n = pix.length; i < n; i += 4) {
				if (!checkColor(i, pix)) {
					pix[i] = 255;
					pix[i+1] = 0;
					pix[i+2] = 0;
					
					a++;					
					if (a == k && j == 0) j = i - k*3;
					
				} else a = 0;					
			}
			
			if (j != 0) for (var i = j; i < j+k*3; i++) pix[i] = 255;			
			
			var x = Math.floor(Math.floor(j/3)%canvas.height);
			var y = Math.floor(Math.floor(j/3)/canvas.height);
			console.log(j+"/"+x+"/"+y)
			
			context.putImageData(imgd,0,0);
			
			context.fillRect(x, y, 5, 5);
			
			var time = document.getElementById("time");
			time.innerHTML = (+new Date() - startTime);
			

            // And repeat.
            setTimeout(processWebcamVideo, 50);
        }
		
		function checkColor(i, pix) {
			
			var j = 100;	
					
			if (colors[i] == null) {
				
				colors[i] = pix[i];
				colors[i+1] = pix[i+1];
				colors[i+2] = pix[i+2];
				
			} else if (colors[i] < pix[i]-j || colors[i] > pix[i]+j ||
									 colors[i+1] < pix[i+1]-j || colors[i+1] > pix[i+1]+j ||				
									 colors[i+2] < pix[i+2]-j || colors[i+2] > pix[i+2]+j) {
				colors[0][i] = pix[i];
				colors[i+1] = pix[i+1];
				colors[i+2] = pix[i+2];
				return false;
			}
			
			return true;
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